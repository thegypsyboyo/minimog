/* eslint-disable no-lonely-if */
export default function getGreetingByTime() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'Good morning';
    } if (hour >= 12 && hour < 18) {
        return 'Good afternoon';
    }
    return 'Good evening';

}

export function getGreetingByTimeAndLocation(location: string): string {
    const date = new Date();
    const hour = date.getHours();

    let greeting: string;

    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    // Customize the greeting based on location if needed
    if (location === 'Kenya') {
        greeting += ', Hakuna Matata!';
    } else if (location === 'India') {
        greeting += ', Namaste!';
    }

    return greeting;
}

// export function getGreetingByTimeAndLocation(location: string, currentTime: Date): string {
//     // Get the current time in the Netherlands (CET)
//     const netherlandsTime = new Date(currentTime.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }));

//     // Extract the hour component from the Netherlands time
//     const netherlandsHour = netherlandsTime.getHours();

//     // Determine the appropriate greeting based on the hour
//     let greeting = "";
//     if (netherlandsHour >= 5 && netherlandsHour < 12) {
//         greeting = "Good morning";
//     } else if (netherlandsHour >= 12 && netherlandsHour < 18) {
//         greeting = "Good afternoon";
//     } else {
//         greeting = "Good evening";
//     }

//     return greeting;
// }
