
export function getToken(){
  const url = "https://api.dailymotion.com/oauth/token";
  const dataStr = `grant_type=password&client_id=fde33fd61216a9f5d5b3&client_secret=8c2da34f17658205f7321b5802a15ecfa1e7964a&username=youssefraouf32%40gmail.com&password=eZ3%40m9mj7czTbYX&scope=manage_videos`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: dataStr
  }).then(res => res.json()).then(res => res.access_token)
}

export async function uploadUrl(videoUrl){
  const token = await getToken();
  const dataStr = `url=${encodeURIComponent(videoUrl)}&title=Video_${new Date().getTime()+""}&tags=dailymotion%2Capi%2Csdk%2Ctest&channel=videogames&published=true`
  const resUrl = 'https://www.dailymotion.com/video/'
  const url = "https://api.dailymotion.com/videos"
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: dataStr
  }
  return fetch(url, options).then(res => res.json()).then(res => `${resUrl}${res.id}`)
}