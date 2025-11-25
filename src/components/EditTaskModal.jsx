import { useState, useEffect } from 'react'

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate
      })
    }
  }, [task])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
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
      onSave(task.id, formData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl max-w-md w-full p-6 border border-slate-600 border-opacity-30 transform transition-all duration-300 scale-100">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-slate-700 bg-opacity-50 rounded-xl flex items-center justify-center mr-3 border border-slate-600 border-opacity-30">
            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-200 text-glow">Edit Task</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-slate-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`glass w-full px-4 py-3 text-slate-200 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                errors.title ? 'border border-red-500 border-opacity-50' : ''
              }`}
              placeholder="Enter task title"
            />
            {errors.title && <p className="mt-2 text-sm text-red-400">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              id="edit-description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className={`glass w-full px-4 py-3 text-slate-200 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.description ? 'border border-red-500 border-opacity-50' : ''
              }`}
              placeholder="Enter task description"
            />
            {errors.description && <p className="mt-2 text-sm text-red-400">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-priority" className="block text-sm font-medium text-slate-300 mb-2">
                Priority
              </label>
              <select
                id="edit-priority"
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
              <label htmlFor="edit-dueDate" className="block text-sm font-medium text-slate-300 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                id="edit-dueDate"
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

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 bg-opacity-50 rounded-xl backdrop-blur-sm border border-slate-600 border-opacity-30 hover:bg-opacity-70 transition-all duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-slate-200 bg-slate-700 rounded-xl backdrop-blur-sm border border-slate-600 border-opacity-30 hover:bg-slate-600 transition-all duration-200 transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTaskModal