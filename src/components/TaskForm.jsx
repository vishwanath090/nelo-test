import { useState } from 'react'

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const task = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      onAddTask(task)
      
      // Clear form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      })
    }
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-600 border-opacity-30">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-slate-700 bg-opacity-50 rounded-xl flex items-center justify-center mr-3 border border-slate-600 border-opacity-30">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-slate-200 text-glow">Create New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className={`glass w-full px-4 py-3 text-slate-200 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
              errors.title ? 'border border-red-500 border-opacity-50' : ''
            }`}
          />
          {errors.title && <p className="mt-2 text-sm text-red-400">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            className={`glass w-full px-4 py-3 text-slate-200 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none ${
              errors.description ? 'border border-red-500 border-opacity-50' : ''
            }`}
          />
          {errors.description && <p className="mt-2 text-sm text-red-400">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-2">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="glass w-full px-4 py-3 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
            >
              <option value="low" className="text-slate-800">Low</option>
              <option value="medium" className="text-slate-800">Medium</option>
              <option value="high" className="text-slate-800">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-slate-300 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`glass w-full px-4 py-3 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                errors.dueDate ? 'border border-red-500 border-opacity-50' : ''
              }`}
            />
            {errors.dueDate && <p className="mt-2 text-sm text-red-400">{errors.dueDate}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 px-4 rounded-xl shadow-lg backdrop-blur-sm border border-slate-600 border-opacity-30 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 font-medium"
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default TaskForm