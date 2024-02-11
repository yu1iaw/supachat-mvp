export const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export const generateRoomId = (myId, userId) => {
    const formattedMyId = myId.slice(0, 18);
    const formattedUserId = userId.slice(0, 18);
    const sortedArr = [formattedMyId, formattedUserId].sort();

    return sortedArr.join('-');
    
}