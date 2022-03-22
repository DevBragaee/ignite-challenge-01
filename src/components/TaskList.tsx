import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

     // funcao que manipula a criaçao de uma nova tarefa
  function handleCreateNewTask() {
    // impede que seja criada uma task vazia
    if(!newTaskTitle) return; 
      const addNewTask = {
        id:Math.random(),
        title:newTaskTitle, 
        isComplete: false
      }
      /* 'setState' pode ser usado na forma de callback
usando o conceito de "spreadoperator " que mantem o estado anterior"oldState" */
     

      setTasks(oldState=>[...oldState,addNewTask]);
      setNewTaskTitle('');
       
    }
    
    
    
     // funcao que vai manipular a comutacao de estado da variavel "isComplete" e seta-lo
    /* precisamos ir na task ,mapear a task pelo id especifico ,entao altera-lo
    e seta-lo no estado.
    para isso usamos o operador TERNARIO*/
  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task=>task.id == id ?{
      ...task,
      isComplete:!task.isComplete
      }:task)
      
      setTasks(newTasks)
   
  }

  function handleRemoveTask(id: number) {
    //remover tarefa: 
    const filteredTasks = tasks.filter(task=>task.id !== id);
   // Aqui estamos setando a array de tasks com as tasks filtradas
   // criando um novo objeto nunca alterando(imutabilidade)
   // alocando um novo espaço na memoria(mais inteligente) 
   setTasks(filteredTasks);
    
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}