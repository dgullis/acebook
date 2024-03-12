import { useState, useEffect, useRef } from "react";
import { editPost } from "../../services/posts";
import "./PostText.css"

export default function PostText(props){
    const [errorMessage, setErrorMessage] = useState("");
    const textareaRef = useRef(null);


    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`; 
        }
    
    },[props.postText])

    return (
        <div>
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