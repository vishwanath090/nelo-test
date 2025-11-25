// Search matching utility
export const matchTasks = (tasks, searchTerm) => {
  if (!searchTerm.trim()) return tasks

  const term = searchTerm.toLowerCase()
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term) ||
    task.description.toLowerCase().includes(term) ||
    task.priority.toLowerCase().includes(term)
  )
}