// // 01   context  组件数据传统
// import logo from './logo.svg';
// import React , {Component, createContext,useState} from 'react'
// import './App.css'
// const BatteryContent = createContext()

// function Leaf (){
//   return (
//     // 消费者组件  // 组件内要有{}表达式，函数的唯一参数就是content.provider的值
//     <BatteryContent.Consumer> 
//       { them => 
//         <h1>battery:{them}</h1>
//       }
//     </BatteryContent.Consumer>
//   )
//   }
//   const Middle = (prop) =>{
//     return (
//       <Leaf></Leaf>
//     )
//   }
// function App() {
//   const [state, setstate] = useState(60)
//   return (
//     <BatteryContent.Provider value={state}>
//       <button type='primary' onClick={()=>setstate((val)=>val-1)}>Primary</button>
//       <Middle></Middle>
//     </BatteryContent.Provider>
//   );
// }

// export default App;


// // 02   多个context  组件间数据传递使用

// import logo from './logo.svg';
// import React , {Component, createContext,useState} from 'react'
// import './App.css'
// const BatteryContent = createContext()
// const OnlineContent = createContext()

// function Leaf (){
//   return (
//     // 消费者组件  // 组件内要有{}表达式，函数的唯一参数就是content.provider的值
//     //这里要用String  因为布尔值可能渲染不出来
//     <BatteryContent.Consumer> 
//       { battery => (
//         <OnlineContent.Consumer>
//           { online => (<h1>battery:{battery}, online:{String(online)}</h1>)}  
//         </OnlineContent.Consumer>
//       )
        
//       }
//     </BatteryContent.Consumer>
//   )
//   }
//   const Middle = (prop) =>{
//     return (
//       <Leaf></Leaf>
//     )
//   }
//   // 如果有多个provider  只需在provider中嵌套即可  无须在乎顺序
// function App() {
//   const [state, setState] = useState(60)
//   const [online, setOnline] = useState(false)
//   return (    
//     <BatteryContent.Provider value={state}>
//       <OnlineContent.Provider value={online}>
//         <button type='primary' onClick={()=>setState((val)=>val-1)}>Primary</button>
//         <button type='primary' onClick={()=>setOnline((val)=>!val)}>Switch</button>
//         <Middle></Middle>
//       </OnlineContent.Provider>

//     </BatteryContent.Provider>
//   );
// }

// export default App;

// 03   使用contextType

// import logo from './logo.svg';
// import React , {Component, createContext,useState} from 'react'
// import './App.css'
// const BatteryContent = createContext()

// function Leaf (){
//   const contentType = BatteryContent
//   console.log(contentType)
//   const battery = contentType._currentValue
//   return (
//     // 消费者组件  // 组件内要有{}表达式，函数的唯一参数就是content.provider的值
//     //这里要用String  因为布尔值可能渲染不出来s
//     <h1>battery:{battery}</h1>
//   )
//   }
//   const Middle = (prop) =>{
//     return (
//       <Leaf></Leaf>
//     )
//   }
//   // 如果有多个provider  只需在provider中嵌套即可  无须在乎顺序
// function App() {
//   const [state, setState] = useState(60)
//   const [online, setOnline] = useState(false)
//   return (    
//     <BatteryContent.Provider value={state}>
//       <button type='primary' onClick={()=>setState((val)=>val-1)}>Primary</button>
//       <Middle></Middle>
//     </BatteryContent.Provider>
//   );
// }

// export default App;



// lazy  解决首屏加载时优化问题

// import React , {Component,lazy,Suspense } from 'react'
// import './App.css'
// // about 组件network会另外走
// const About = lazy(()=> import (/* webpackChunkName:"about"*/'./About.jsx'))  //About 就是react组件  // /*webpackChunkName:"chunk注释后lazyload的组件network 请求就会变成chunk***这种 // 后面 fallback 只能传入标签

// //异常捕获边界（Error boundaries）

//   // 如果有多个provider  只需在provider中嵌套即可  无须在乎顺序
// function App() {
//   return (   
//     <div>
//       <Suspense fallback={<div>loading</div>}> 
//         <About></About>
//       </Suspense>
//     </div> 
//   );
// }

// export default App;


// //  自定义hook   use开头
// import logo from './logo.svg';
// import React , {useMemo ,useState } from 'react'
// import './App.css'
//   function useCount(defCount){
//     const [count, setCount] = useState(defCount)

//     return [count,setCount]
//   }
//   const Counter = (prop) =>{
//       console.log('Foo render')
//     return (
//       <h1>{prop.count}</h1>
      
//     )
//   }

//   // 如果有多个provider  只需在provider中嵌套即可  无须在乎顺序
// function App() {
//   const [count, setCount] = useState(0)
//   const [count, setCount] = useCount(0) //两者效果相同
  
//   return (   
//     <div>
//       <Counter count={count} ></Counter>
//       <button onClick={( )=>setCount((val)=>val+1)}>add {count}</button>
//       <h1>count:{count} , double:{double}</h1>;
//     </div> 
//   );
// }
// export default App;


//  自定义hook   use开头
import React , { useCallback, useState ,useRef, useEffect,memo} from 'react'
import './App.css'
  function useCount(defCount){
    const [count, setCount] = useState(defCount)

    return [count,setCount]
  }
  let isSeq =Date.now()
  const Control=memo(function Control (props) {
    const {addTodo} =props
    const inputRef = useRef()
      console.log('Foo render')
      const onSubmit = (e)=>{
        e.preventDefault()
        const newText = inputRef.current.value.trim()
        console.log(newText.length)
        if(!newText.length){return}
          addTodo({
            id:isSeq++,
            text:newText,
            complete:false
          })
        // }
        inputRef.current.value = ''
      }
    return (
      <div className="control">
        <h1> todos </h1>
        <form onSubmit={onSubmit}>
          <input type='text' ref={inputRef} className='new-todo' placeholder='what needs to do'></input>
        </form>
      </div>
     
      
    )
  })
  const TodoItem =memo(function TodoItem(props){
    const {
      todo:{
        id,text,complete
      },
      toggleTodo,
      removeTodo
    } =props
    const onChange =()=>{
        toggleTodo(id)
    }
    const onRemove =()=>{
        removeTodo(id)
    }
    return(
      <li className='todo-item'>
        <input type='checkbox' onChange={onChange} checked={complete}></input>
        <label className={complete?'complete':''}>{text}</label>
        <button onClick={onRemove}>&#xd7;</button>
      </li>
      )
  })
  const Todos=memo(function Todos(props){
    const {todos,toggleTodo,removeTodo} =props
    return(
      <ul>{
        todos.map((todo)=>{
          return (<TodoItem  key={todo.id} todo ={todo} toggleTodo={toggleTodo} removeTodo={removeTodo}/>) 
        })
      }
      </ul>
    )
  }) //memo  用于函数组件的优化
  
const LS_KEY='TODOS'
  // 如果有多个provider  只需在provider中嵌套即可  无须在乎顺序
function TodoList() {
  const [todos, setTodos] = useState([])
  const [count, setCount] = useCount(0) //两者效果相同
  const addTodo = useCallback((todo) => {
    console.log(todos,todo)
    setTodos((todos)=>[...todos,todo])
  },[])
  const removeTodo = useCallback((id) => {
    setTodos( todos => todos.filter((item)=> {return item.id!==id}))
  },[])
  const toggleTodo = useCallback((id) => {
    setTodos( todos=>todos.map((todo)=>{
      return todo.id === id ?{...todo,complete:!todo.complete}:todo
    }));
  },[])
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem(LS_KEY)||'[]')
    console.log(todos)
    setTodos(todos)
  },[])
  useEffect(()=>{
    localStorage.setItem(LS_KEY,JSON.stringify(todos))
  },[todos])
  return (   
    <div className='todo-list'>
      <Control addTodo={addTodo}></Control>
      <Todos todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo}></Todos>
    </div> 
  );
}

export default TodoList;