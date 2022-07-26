import axios from "axios";

function breakerTest(url){
    try{
        axios.get(url).then(response => {
            let resp = response.data
        });
    }catch(err){
        console.log(err);
    }
}

export default breakerTest;