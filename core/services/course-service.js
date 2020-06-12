export const renderCourses = (title) => {
    const courses = [
        {
            id : 1,
            title: 'React Native',
            author: 'Author 1',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/1.jpg'),
            rating: 4
        },
        {
            id : 2,
            title: 'UI/UX Design',
            author: 'Author 2',
            level: 'Advance',
            release: 'May 6, 2020',
            duration: '50 hours',
            image: require('../../assets/2.jpg'),
            rating: 4
        },
        {
            id : 3,
            title: 'ASP.NET',
            author: 'Author 3',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/3.jpg'),
            rating: 4
        },
        {
            id : 4,
            title: 'AWS',
            author: 'Author 4',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/4.jpg'),
            rating: 4
        },
    ]

    const mobile_course = [
        {
            id : 1,
            title: 'The Complete React Native',
            author: 'Author 1',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/MobileCourse/react-native.png'),
            rating: 4
        },
        {
            id : 2,
            title: 'Authencation Social With Flutter',
            author: 'Author 2',
            level: 'Advance',
            release: 'May 6, 2020',
            duration: '50 hours',
            image: require('../../assets/MobileCourse/flutter_social_auth.jpeg'),
            rating: 4
        },
        {
            id : 3,
            title: 'Build The Taxi App With React Native',
            author: 'Author 3',
            level: 'Advance',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/MobileCourse/reactnative_taxi.png'),
            rating: 4
        },
        {
            id : 4,
            title: 'iOS 13 & Swift 5: Chat App With Firestore | MVVM',
            author: 'Author 4',
            level: 'Advance',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/MobileCourse/swift_chatapp.jpg'),
            rating: 4
        },
    ]

    const web_course = [
        {
            id : 1,
            title: "The Web Developer's Bootcamp",
            author: 'Author 1',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/WebCourse/html5.jpg'),
            rating: 4
        },
        {
            id : 2,
            title: 'Java Web Service',
            author: 'Author 2',
            level: 'All Levels',
            release: 'May 6, 2020',
            duration: '50 hours',
            image: require('../../assets/WebCourse/soap_rest.jpg'),
            rating: 4
        },
        {
            id : 3,
            title: 'Web Development Intro',
            author: 'Author 3',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/WebCourse/webintro.jpg'),
            rating: 4
        },
        {
            id : 4,
            title: 'Bootstrap Responsive Web Design Tutorial For Beginners',
            author: 'Author 4',
            level: 'All Levels',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/WebCourse/boostrap.jpg'),
            rating: 4
        },
    ]

    const game_course = [
        {
            id : 1,
            title: "Complete C# Unity Developer 2D: Learn to Code Making Games",
            author: 'Author 1',
            level: 'All Levels',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/GameCourse/unity.jpg'),
            rating: 4
        },
        {
            id : 2,
            title: 'Unreal Engine C++ Developer: Learn C++ and Make Video Games',
            author: 'Author 2',
            level: 'Advance',
            release: 'May 6, 2020',
            duration: '50 hours',
            image: require('../../assets/GameCourse/unreal.jpg'),
            rating: 4
        },
        {
            id : 3,
            title: 'Complete C# Unity Developer 3D: Learn to Code Making Games',
            author: 'Author 3',
            level: 'All Levels',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/GameCourse/unity3d.jpg'),
            rating: 4
        },
        {
            id : 4,
            title: 'RPG Core Combat Creator: Learn Intermediate Unity C# Coding',
            author: 'Author 4',
            level: 'Intermediate',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/GameCourse/rpg.jpg'),
            rating: 4
        },
    ]

    const db_course = [
        {
            id : 1,
            title: 'The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert',
            author: 'Author 1',
            level: 'Beginer',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/DbCourse/mysql1.jpg'),
            rating: 4
        },
        {
            id : 2,
            title: 'The Complete Oracle SQL Certification Course',
            author: 'Author 2',
            level: 'All Levels',
            release: 'May 6, 2020',
            duration: '50 hours',
            image: require('../../assets/DbCourse/oracle1.jpg'),
            rating: 4
        },
        {
            id : 3,
            title: "MongoDB - The Complete Developer's Guide 2020",
            author: 'Author 3',
            level: 'All Levels',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/DbCourse/mongodb1.jpg'),
            rating: 4
        },
        {
            id : 4,
            title: 'SQL for Beginners: Learn SQL using MySQL and Database Design',
            author: 'Author 4',
            level: 'Beginner',
            release: 'May 6, 2020',
            duration: '40 hours',
            image: require('../../assets/DbCourse/mysql2.jpg'),
            rating: 4
        },
    ]
    const null_array = []
    
    if(title === 'Design'){
        return {title: 'Design', array: courses}
    }

    if(title === 'Mobile Development'){
        return {array: mobile_course}
    }

    if(title === 'Web Development'){
        return {array: web_course}
    }

    if(title === 'Game Development'){
        return {array: game_course}
    }

    if(title === 'Databases Development'){
        return {array: db_course}
    }
    return {array: null_array}
}