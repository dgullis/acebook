import './Notification.css'

import { deleteNotification } from "../../services/user"


export default function Notification({username, notification, token, userPageRender}) {

    
    const acknowledgeNotification = async() => {
        try {
            const response = await deleteNotification(username, notification._id, token)
            userPageRender()
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