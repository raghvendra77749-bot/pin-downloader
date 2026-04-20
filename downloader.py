import requests
import re
import os

def get_pinterest_media(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    }
    
    print("🔍 Fetching media details...")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print("❌ Error: Link load nahi ho raha.")
        return

    # Video link dhoondne ke liye regex
    video_links = re.findall(r'"url":"(https://v1\.pinimg\.com/videos/mc/hls/.*?\.mp4)"', response.text)
    
    # Image link dhoondne ke liye regex
    image_links = re.findall(r'"url":"(https://i\.pinimg\.com/originals/.*?\.jpg)"', response.text)

    if video_links:
        media_url = video_links[0].replace('\\u002f', '/')
        ext = ".mp4"
    elif image_links:
        media_url = image_links[0].replace('\\u002f', '/')
        ext = ".jpg"
    else:
        print("❌ Media link nahi mila. Pinterest ne algorithm change kiya hai.")
        return

    print(f"✅ Link Found: {media_url}")
    
    # Download start
    r = requests.get(media_url, stream=True)
    filename = f"pinterest_media{ext}"
    
    with open(filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)
    
    print(f"🎉 Download Complete! File saved as: {os.path.abspath(filename)}")

# Use karne ke liye
pin_url = input("Pinterest Link Paste Karein: ")
get_pinterest_media(pin_url)
