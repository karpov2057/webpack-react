import { useState, useEffect, useCallback } from 'react'

type DisclosureOptions = {
	onOpen?: () => void
	onClose?: () => void
}

export const useDisclosure = (
	initialState = false,
	{ onOpen = undefined, onClose = undefined }: DisclosureOptions = {}
) => {
	const [isOpen, setIsOpen] = useState(initialState)

	useEffect(() => {
		setIsOpen(initialState)
	}, [initialState])

	const open = useCallback(() => {
		setIsOpen(true)
		onOpen?.()
	}, [onOpen])

	const close = useCallback(() => {
		setIsOpen(false)
		onClose?.()
	}, [onClose])

	const toggle = useCallback(() => {
		setIsOpen((prev) => {
			const next = !prev
			next ? onOpen?.() : onClose?.()
			return next
		})
	}, [onOpen, onClose])

	return { isOpen, open, close, toggle }
}
