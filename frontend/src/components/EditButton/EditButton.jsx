import { useState } from "react";

// EDIT POST WORKS WITH THIS BUT THE BUTTON DOESN'T WORK PROPERLY

const EditButton = (props) => {
	const [buttonText, setButtonText] = useState("Edit");

	const handleClick = async () => {
		try {
			if (props.onEdit) {
				setButtonText(props.edits === false ? "Cancel edit" : "Edit");
				props.handleEdit();
			}
		} catch (error) {
			console.error("Error handling edit:", error);
		}
	};
	return props.showButton ? <button onClick={handleClick}>edit post</button> : null;
};
export default EditButton;
