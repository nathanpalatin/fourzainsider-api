import { randomUUID } from 'node:crypto'

import { Prisma, type Courses } from '@prisma/client'
import type { CoursesRepository } from '../courses-repository'

export class InMemoryCoursesRepository implements CoursesRepository {
	public items: Courses[] = []

	async findById(id: string) {
		const course = this.items.find(item => item.id === id)

		if (!course) {
			return null
		}

		return course
	}

	async create(data: Prisma.CoursesCreateInput) {
		const course = {
			id: randomUUID(),
			tags: Array.isArray(data.tags) ? data.tags : [],
			type: data.type,
			title: data.title,
			userId: data.user.connect?.id ? data.user.connect.id : '',
			image: data.image,
			user: {
				connect: {
					id: data.user.connect?.id
				}
			},
			level: data.level ?? 'easy',
			duration: data.duration,
			description: data.description,
			createdAt: new Date(),
			updatedAt: new Date()
		}

		this.items.push(course)

		return course
	}
	async findMany(userId: string) {
		const courses = {
			...this.items,
			userId
		}

		return courses
	}

	async delete(id: string) {
		const course = this.items.find(item => item.id === id)
		if (!course) {
			return null
		}

		this.items = this.items.filter(item => item.id !== id)

		return course
	}
}
