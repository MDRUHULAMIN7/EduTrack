import Banner from "../../Components/Banner.jsx/Banner"
import CardSection from "../CardSection/CardSection"
import GallarySection from "../GallarySection/GallarySection"
import ReviewSlider from "../MyCollege/ReviewSlider"
import { Research } from "../Research/Research"


function Home() {
  return (
    <div>

      <Banner></Banner>
      <CardSection></CardSection>
      <GallarySection></GallarySection>
      <Research></Research>

      <ReviewSlider></ReviewSlider>
 
    </div>
  )
}

export default Home