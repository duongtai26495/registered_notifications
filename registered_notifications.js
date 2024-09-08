// Thêm CSS vào trang
const addNotificationCSS = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        #sale-notification {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: rgb(255 255 255 / 80%);
            box-shadow: 0 0 2px 1px #00095b;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            border-left:solid 10px #00095b;
            padding-bottom:50px;
        }
        #sale-notification.show {
            opacity: 1;
        }
        #sale-notification .name {
            font-size: 17px;
            margin: 5px 0 0;
            color: #0014cd;
        }
        #sale-notification .name span{
            font-weight:bold;
        }

        #sale-notification .info{
            font-style: italic;
            color:black;
            margin-block:0;
        }
        #sale-notification .time,
        #sale-notification .link
        {
            display: flex;
            position: absolute;
            bottom:10px;
            align-items: center;
            gap: 5px;
        }
        #sale-notification .link
        {
            align-self: end;
            width: fit-content;
            right:20px;
            color:white;
            cursor:pointer;
            padding:5px 10px;
            border-radius:5px;
            background-color:#00095b;
            text-decoration: none;
        }
        #sale-notification .time {
            left: 20px;
            font-size: 12px;
            color: red;
        }

        @media (max-width:767px)
        {
            #sale-notification {
                bottom: 20px;
                left: 10px;
                width: 600px;
                max-width: 80%;
                padding: 5px;
                z-index: 1000;
                border-left: solid 5px #00095b;
                padding-bottom: 40px;
            }
            #sale-notification .name {
                font-size: 15px;
            }
            #sale-notification .info {
                font-size: 12px;
                margin-top:5px;
            }
            #sale-notification .time svg {
                width: 15px;
                height: 15px;
            }
            #sale-notification .time {
                left: 5px;
            }
            #sale-notification .link
            {
                right:10px;
                font-size:12px;
                padding: 1px 5px;
            }
            #sale-notification .time,
            #sale-notification .link
            {
                bottom:5px;
            }
        }
    `;
    document.head.appendChild(style);
};

// Thêm div để hiển thị thông báo vào trang
const addNotificationDiv = () => {
    const notificationDiv = document.createElement('div');
    notificationDiv.id = 'sale-notification';
    notificationDiv.className = 'sale-notification';
    document.body.appendChild(notificationDiv);
};

// Tính toán thời gian "xx phút trước", "xx giờ trước"
const calculateTimeAgo = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const eventTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    
    const diffInMs = now - eventTime; // Tính khoảng cách thời gian (ms)
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // đổi thành phút
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInMinutes < 1) {
        return "vài giây trước";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else {
        return `${diffInHours} giờ trước`;
    }
};

const formatNotification = (user) => {
    const { name, car, time, gender, link } = user;
    const prefix = gender === 'male' ? 'Anh' : 'Chị';
    const timeAgo = calculateTimeAgo(time);

    return `
        <span class="time">
        <svg fill="#ff0000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.42 489.42" xml:space="preserve" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M46.1,138.368c4.2,2.1,16.1,8.4,29.1-6.2c5.2-7.3,10.4-14.6,16.6-21.8c7.3-8.3,6.2-21.8-2.1-29.1 c-8.3-7.3-21.8-6.2-29.1,2.1s-14.6,17.7-20.8,27C33.7,119.668,36.8,132.068,46.1,138.368z"></path> <path d="M249,40.568c19.8,0,39.5,3.1,58.3,9.4c12.6,3.7,21.8-4.2,26-12.5c3.1-11.4-3.1-22.9-13.5-26 c-22.9-7.3-45.8-11.4-69.7-11.4c-11.4,0-20.8,8.3-20.8,19.8S237.6,40.568,249,40.568z"></path> <path d="M434.2,167.468c7.3,17.7,11.4,36.4,13.5,55.1c0,0,1.2,23.2,22.9,19.8c21.5-2.8,18.7-23.9,18.7-23.9 c-2.1-22.9-8.3-45.8-16.6-66.6c-5.2-10.4-16.6-15.6-27-11.4C435.2,145.668,430,157.068,434.2,167.468z"></path> <path d="M359.3,75.968c16.6,11.4,31.2,25,43.7,40.6c9.3,11.6,25,6.8,28.1,3.1c8.3-7.3,10.4-20.8,3.1-29.1 c-14.6-17.7-32.3-34.3-52-47.9c-9.4-6.2-21.8-4.2-28.1,5.2S349.9,69.668,359.3,75.968z"></path> <path d="M134.6,72.768c16.6-10.4,35.4-18.7,54.1-23.9c11.4-3.1,17.7-14.6,14.6-25c-3.1-11.4-14.6-17.7-25-14.6 c-22.9,6.2-44.7,15.6-64.5,28.1c-9.4,6.2-12.5,18.7-6.2,28.1C111.7,71.768,120.5,77.968,134.6,72.768z"></path> <path d="M468.5,268.368c-11.4-3.1-21.8,4.2-23.9,15.6c-2.1,9.4-8.5,31.3-8.6,33.4c-27.5,71.5-93.5,121.8-169.3,129.9 c-74.6,7.8-147.2-25.9-189.3-86.5l38.5,8.5c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-81.1-17.7 c-5.2-1-21.4,0-25,15.6l-17.7,82.2c-2.1,10.4,4.2,21.8,15.6,23.9c12.7,1.3,21.8-6.2,25-16.6l6.2-28.2 c46.3,62.7,129.9,109.1,223.7,99c94.6-10.2,174.8-73.9,206-163.3c1-2.6,5.7-24.4,7.3-32.3 C487.3,280.868,480,270.468,468.5,268.368z"></path> <path d="M164.6,265.268h95.9c11.4,0,19.8-9.4,20.8-20.8v-142.2c0-11.4-9.4-20.8-20.8-20.8c-11.4,0-20.8,9.4-20.8,20.8v121.4h-75.1 c-11.4,0-20.8,9.4-20.8,20.8S153.1,265.268,164.6,265.268z"></path> </g> </g> </g></svg>
        ${timeAgo}</span> 
        <p class="name">${prefix} <span>${name}</span></p>
        <p class="info">đã đăng ký <strong>${car}</strong> cho sự kiện lái thử sắp tới.</p>
        <a class="link" href="${link}">Đi xem thử 
        <svg viewBox="0 0 24 24"  height="25px" width="25px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white"><g id="SVGRepo_bgCarrier" stroke-width="white"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </a>
    `;
};

const showNotification = (message) => {
    const notificationDiv = document.getElementById('sale-notification');
    notificationDiv.innerHTML = message;
    notificationDiv.classList.add('show');
    setTimeout(() => {
        notificationDiv.classList.remove('show');
    }, 7000);
};

const startNotifications = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/duongtai26495/registered_notifications/main/data.json'); 
        const data = await response.json();
        const users = data.users;
        let index = 0;

        const showNextNotification = () => {
            const message = formatNotification(users[index]);
            showNotification(message);
            index = (index + 1) % users.length; 
            scheduleNextNotification(); 
        };

        const scheduleNextNotification = () => {
       
            const randomDelay = Math.floor(Math.random() * (45000 - 10000 + 1)) + 10000;
            setTimeout(showNextNotification, randomDelay);
        };
        
        scheduleNextNotification();
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu JSON:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    addNotificationCSS();
    addNotificationDiv();
    startNotifications();
});
