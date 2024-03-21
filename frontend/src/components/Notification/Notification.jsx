import './Notification.css'
import { deleteNotification } from "../../services/user"

// Component renders notification message and button to close and delete notification
export default function Notification({username, notification, token, userPageRender}) {

    const acknowledgeNotification = async() => {
        try {
            // Attempts to delete notification
            const response = await deleteNotification(username, notification._id, token)
            userPageRender() // Triggers re render of user page
        } catch (error) {
            console.log(error) 
        }
    }

    return (
            <div className="notification-container">
                <div className="notification-message">
                    <p>{notification.message}</p> 
                </div>
                
                <div className="notification-close-button">
                    <button onClick={acknowledgeNotification}>
                        x
                    </button> 
                </div>
            </div>
        )

}