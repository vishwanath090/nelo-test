import { useState, useEffect } from 'react'
import TaskForm from '../components/TaskForm'
import TaskCard from '../components/TaskCard'
import EditTaskModal from '../components/EditTaskModal'
import FilterBar from '../components/FilterBar'
import { logout, getUser } from '../utils/session'
import { matchTasks } from '../utils/matcher'
import { useDebounce } from '../hooks/useDebounce'

const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Task Mail Automation Simulation
  useEffect(() => {
    const checkPendingTasks = () => {
      const pendingTasks = tasks.filter(task => 
        task.status === 'pending' && 
        new Date(task.dueDate) < new Date()
      )
      
      if (pendingTasks.length > 0) {
        console.log(`📧 Mock Email Sent: ${pendingTasks.length} overdue task(s) found!`)
        // In a real app, this would send actual email notifications
      }
    }

    // Check immediately
    checkPendingTasks()

    // Set up interval to check every 20 minutes
    const interval = setInterval(checkPendingTasks, 20 * 60 * 1000) // 20 minutes

    return () => clearInterval(interval)
  }, [tasks])

  const handleAddTask = (newTask) => {
    setTasks(prev => [newTask, ...prev])
  }

  const handleEditTask = (taskId, updatedData) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updatedData } : task
    ))
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId))
    }
  }

  const handleToggleComplete = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ))
  }

  const handleLogout = () => {
    logout()
    onLogout()
  }

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    // Apply status/priority filter
    if (filter === 'completed' && task.status !== 'completed') return false
    if (filter === 'pending' && task.status !== 'pending') return false
    if (['high', 'medium', 'low'].includes(filter) && task.priority !== filter) return false
    
    return true
  })

  // Apply search
  const searchedTasks = matchTasks(filteredTasks, debouncedSearchTerm)

  const user = getUser()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-slate-700 rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-slate-600 rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-500 rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="glass border-b border-slate-600 border-opacity-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-slate-700 bg-opacity-50 rounded-lg flex items-center justify-center mr-3 border border-slate-600 border-opacity-30">
                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-200 text-glow">Task Manager</h1>
                <p className="text-slate-400 text-sm">Welcome, {user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 bg-opacity-50 rounded-xl backdrop-blur-sm border border-slate-600 border-opacity-30 hover:bg-opacity-70 transition-all duration-200 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Task Form */}
          <div className="lg:col-span-1">
            <TaskForm onAddTask={handleAddTask} />
          </div>

          {/* Right Column - Task List */}
          <div className="lg:col-span-2">
            <FilterBar
              currentFilter={filter}
              onFilterChange={setFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            <div className="mt-6 space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {searchedTasks.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl border border-slate-600 border-opacity-30">
                  <div className="w-16 h-16 bg-slate-700 bg-opacity-30 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-600 border-opacity-30">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-lg">
                    {tasks.length === 0 ? 'No tasks yet. Add your first task!' : 'No tasks match your filters.'}
                  </p>
                </div>
              ) : (
                searchedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(task) => {
                      setEditingTask(task)
                      setIsModalOpen(true)
                    }}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Task Modal */}
      <EditTaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        onSave={handleEditTask}
      />
    </div>
  )
}

export default Dashboard