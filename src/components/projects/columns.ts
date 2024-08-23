import { Trash, Pencil, ArrowUpDown } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types/Project'

export function createColumns({ deleteProject, editProject }: { deleteProject: (id: number) => void, editProject: (project: Project) => void }): ColumnDef<Project>[] {
    return [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('name'))
            },
        },
        {
            accessorKey: 'description',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Description', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('description'))
            },
        },
        {
            accessorKey: 'location',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Location', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('location'))
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Status', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
            },
        },
        {
            accessorKey: 'startDate',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Start Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('startDate')).toDateString())
            },
        },
        {
            accessorKey: 'endDate',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['End Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('endDate')).toDateString())
            },
        },
        {
            accessorKey: 'createdAt',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Created At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, new Date(row.getValue('createdAt')).toDateString())
            },
        },
        {
            accessorKey: 'actions',
            header: () => h('div', { class: 'text-right font-medium' }, 'Actions'),
            cell: ({ row }) => {
                return h('div', { class: 'text-right font-medium flex float-right space-x-3 items-center' }, [
                    h(Pencil, {
                        class: 'cursor-pointer h-4 w-4 text-blue-500',
                        onClick: () => {
                            editProject(row.original);
                        },
                    }),
                    h(Trash, {
                        class: 'cursor-pointer ml-2 h-4 w-4 text-red-500',
                        onClick: () => {
                            deleteProject(row.original.id);
                        },
                    }),
                ])
            },
        },
    ]
}