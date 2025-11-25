const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900 bg-opacity-30 text-red-200 border border-red-800 border-opacity-50'
      case 'medium':
        return 'bg-yellow-900 bg-opacity-30 text-yellow-200 border border-yellow-800 border-opacity-50'
      case 'low':
        return 'bg-green-900 bg-opacity-30 text-green-200 border border-green-800 border-opacity-50'
      default:
        return 'bg-slate-700 bg-opacity-30 text-slate-300 border border-slate-600 border-opacity-50'
    }
  }

  const getStatusColor = (status) => {
    return status === 'completed' 
      ? 'bg-green-900 bg-opacity-30 text-green-200 border border-green-800 border-opacity-50'
      : 'bg-slate-700 bg-opacity-30 text-slate-300 border border-slate-600 border-opacity-50'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const isOverdue = () => {
    return new Date(task.dueDate) < new Date() && task.status !== 'completed'
  }

  return (
    <div className={`glass-card rounded-2xl p-5 border-l-4 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl ${
      task.priority === 'high' ? 'border-red-500' :
      task.priority === 'medium' ? 'border-yellow-500' :
      'border-green-500'
    } ${isOverdue() ? 'animate-pulse bg-red-900 bg-opacity-20' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-slate-200 text-glow pr-4">{task.title}</h3>
        <div className="flex space-x-2 flex-shrink-0">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>
      
      <p className="text-slate-400 mb-4 text-sm leading-relaxed">{task.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className={`font-medium ${isOverdue() ? 'text-red-400' : 'text-slate-400'}`}>
            Due: {formatDate(task.dueDate)}
          </span>
          {isOverdue() && (
            <span className="ml-2 text-red-400 font-medium">(Overdue)</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`px-3 py-1.5 text-xs rounded-xl backdrop-blur-sm border border-opacity-30 transition-all duration-200 transform hover:scale-110 ${
              task.status === 'completed'
                ? 'bg-slate-700 bg-opacity-50 text-slate-300 border-slate-600 hover:bg-opacity-70'
                : 'bg-green-900 bg-opacity-30 text-green-200 border-green-800 hover:bg-opacity-50'
            }`}
          >
            {task.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
          </button>
          
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 text-xs bg-slate-700 bg-opacity-50 text-slate-300 rounded-xl backdrop-blur-sm border border-slate-600 border-opacity-30 hover:bg-opacity-70 transition-all duration-200 transform hover:scale-110"
          >
            Edit
          </button>
          
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1.5 text-xs bg-red-900 bg-opacity-30 text-red-200 rounded-xl backdrop-blur-sm border border-red-800 border-opacity-50 hover:bg-opacity-50 transition-all duration-200 transform hover:scale-110"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard