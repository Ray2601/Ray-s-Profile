import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { Education } from '@/components/portfolio/education'
import { Experience } from '@/components/portfolio/experience'
import { Projects } from '@/components/portfolio/projects'
import { Skills } from '@/components/portfolio/skills'
import { Contact } from '@/components/portfolio/contact'
import { HomeScroll } from '@/components/portfolio/home-scroll'

export default function Page() {
  return (
    <HomeScroll>
      <Navbar />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </HomeScroll>
  )
}
