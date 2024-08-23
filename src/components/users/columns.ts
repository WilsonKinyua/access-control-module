import { Trash, Pencil, ArrowUpDown, Eye } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { User } from '@/types/User'

export function createColumns({ deleteUser, editUser }: { deleteUser: (id: number) => void, editUser: (User: User) => void }): ColumnDef<User>[] {
    return [
        {
            accessorKey: 'firstName',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['First Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('firstName'))
            },
        },
        {
            accessorKey: 'lastName',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Last Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('lastName'))
            },
        },
        {
            accessorKey: 'email',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('email'))
            },
        },
        {
            accessorKey: 'phoneNumber',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Phone', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('phoneNumber'))
            },
        },
        {
            accessorKey: 'address',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Address', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('address'))
            },
        },
        {
            accessorKey: 'kraPin',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['KRA', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                return h('div', { class: 'text-left font-medium' }, row.getValue('kraPin'))
            },
        },
        {
            accessorKey: 'role',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => ['Role', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
            },
            cell: ({ row }) => {
                const role = row.getValue('role') as any
                return h('div', { class: 'text-left font-medium' }, role ? h(Badge, () => role.name) : h(Badge, { variant: "destructive" }, () => 'N/A'))

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
                            editUser(row.original);
                        },
                    }),
                    h(Trash, {
                        class: 'cursor-pointer ml-2 h-4 w-4 text-red-500',
                        onClick: () => {
                            deleteUser(row.original.id);
                        },
                    }),
                ])
            },
        },
    ]
}