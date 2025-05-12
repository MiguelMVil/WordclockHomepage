const api_url = "https://zenquotes.io/api/quotes/"

const quote_box = document.querySelector('.quote-content')
const author_box = document.querySelector('.quote-author')

async function getQuote() {
    console.log("Fetching quote...")
    const response = await fetch(api_url)
    const data = await response.json()
    

    const quote = data.q
    const author = data.a
    
    console.log("quote_box:", quote_box)
    console.log("author_box:", author_box)
    
    try {
            console.log("Fetching quote...")
            const response = await fetch(api_url)
            if (!response.ok) throw new Error("Network response was not ok")
            const data = await response.json()
            console.log("API data:", data)
    
            if (Array.isArray(data) && data[0] && data[0].q && data[0].a) {
                quote_box.textContent = data[0].q
                author_box.textContent = data[0].a
            } else {
                quote_box.textContent = "No quote found."
                author_box.textContent = ""
                console.error("Unexpected API response structure", data)
            }
        } catch (err) {
            quote_box.textContent = "Error fetching quote."
            author_box.textContent = ""
            console.error("Fetch error:", err)
        }
}



getQuote()


