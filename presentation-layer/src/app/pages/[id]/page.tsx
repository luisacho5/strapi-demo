import Image from "next/image";


const fetchPageContent = async () => {
  try {
    const apiToken=process.env.TOKEN_API_STRAPI
    const response = await fetch(`${process.env.STRAPI_BASE_URL}/api/pages?populate=*`, {
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log(result.data)

    const mappedData = result.data.map(page => ({
      id: page.id,
      title: page.title,
      description: page.description,
      imageUrl: page.image?.url,
    }));

    console.log(mappedData)
    return mappedData

  } catch (error) {
    console.error('Error fetching data:', error)
  }
};


export default async function LandingPage() {
  const mappedData =await fetchPageContent();
  console.log(process.env.STRAPI_BASE_URL+mappedData[0].imageUrl)
  return (
    <div>
      <main>
        <Image
          src={process.env.STRAPI_BASE_URL + mappedData[0].imageUrl}
          alt="landig-page-image"
          width={428}
          height={314}
          priority
        />
        <p>
          {mappedData[0].title}
        </p>
        <p>
          {mappedData[0].description}
        </p>
      </main>
    </div>
  );
}
