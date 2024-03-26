import { useState, useEffect, useRef } from "react";
import "./PostText.css"

// Component to render text content of post
export default function PostText(props){
    const [errorMessage, setErrorMessage] = useState("");
    const textareaRef = useRef(null);

    // Effect hook to adjust textarea height based on content
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`; 
        }
    },[props.postText])

    return (
        <div>
            {/* Textarea for post text, updates state in parent component when value changes
                Initial value is set to existing post text */}
            <textarea
                ref={textareaRef}
                className = {props.edittingPost ? "post-text-area-editing" : "post-text-area"}
                name="text"
                type="text"
                value={props.postText}
                onChange={(e) => props.setPostText(e.target.value)} 
            >
            </textarea>   
        </div>
    )

}