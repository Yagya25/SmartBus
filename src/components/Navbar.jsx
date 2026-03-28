import StaggeredMenu from './StaggeredMenu'

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home', link: '#hero' },
  { label: 'Roadmap', ariaLabel: 'What we are building', link: '#roadmap' },
  { label: 'Problem', ariaLabel: 'The ghost bus problem', link: '#problem' },
  { label: 'Approach', ariaLabel: 'Our approach', link: '#approach' },
  { label: 'Bus Routing', ariaLabel: 'SmartBus control center', link: '#dashboard' },
  { label: 'Comparison', ariaLabel: 'SmartBus vs alternatives', link: '#comparison' },
  { label: 'FAQ', ariaLabel: 'Frequently asked questions', link: '#faq' },
  { label: 'Team', ariaLabel: 'Meet the team', link: '#team' },
]

const socialItems = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
]

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={true}
      colors={['#1a1a2e', '#0f1419']}
      accentColor="#22d3ee"
    />
  )
}
