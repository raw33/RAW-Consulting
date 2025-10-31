import Hero from '../Hero'

export default function HeroExample() {
  return <Hero onContactClick={() => console.log('Contact clicked')} />
}
