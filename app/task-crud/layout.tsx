import React, { Suspense } from 'react'
import Spinner from '../components/spinner'
import TaskEdit from '../components/task-edit'
import TaskList from '../components/task-list'

const TaskCrudLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex px-4">
      <aside
        className={`h-[calc(100vh-104px)] mt-[20px] w-1/4 rounded dark:bg-slate-800`}
      >
        <TaskEdit />
        <Suspense fallback={<Spinner />}>
          {/** @ts-expect-error Async Server Component */}
          <TaskList />
        </Suspense>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  )
}

export default TaskCrudLayout
