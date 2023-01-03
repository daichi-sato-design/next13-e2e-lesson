'use client'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import useStore from '../../store'

const TaskEdit = () => {
  const router = useRouter()
  const { editedTask } = useStore()
  const updateEditedTask = useStore((state) => state.updateEditedTask)
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editedTask.id) {
      await fetch(`/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTask.title,
          completed: false,
        }),
      })
      router.refresh()
      resetEditedTask()
    } else {
      await fetch(`/api/tasks/${editedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedTask.title,
          complited: editedTask.completed,
        }),
      })
      router.refresh()
      resetEditedTask()
    }
  }

  return (
    <div className="m-5 text-center">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          placeholder="New task ?"
          value={editedTask.title || ''}
          onChange={(e) =>
            updateEditedTask({ ...editedTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default TaskEdit
