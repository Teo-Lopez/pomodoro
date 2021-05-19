import Modal from 'antd/lib/modal/Modal'
import React from 'react'

function CustomModal({ text, visible, setModal }) {
	return (
		<Modal
			visible={visible}
			onOk={() => setModal({ show: false, text: '' })}
			onCancel={() => setModal({ show: false, text: '' })}
			cancelButtonProps={{ hidden: true }}
		>
			<p>{text}</p>
		</Modal>
	)
}

export default CustomModal
