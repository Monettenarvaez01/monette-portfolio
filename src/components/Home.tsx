import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import Copy from '@/components/Copy'
import { profile } from '@/data/profile'
import { tools } from '@/data/tools'
import ToolsList from './ToolsList'
import HomeBento from './HomeBento'
import { HomeProfile, HomeStats, HomeExplore } from './HomeMobile'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Home. The headline leads with the value Monette brings founders; the lead
 * role sits under it, then the bento - one card per thing a founder needs to
 * know (who she is, how she thinks, what she does, the work, how to reach
 * her). The page scrolls like every other.
 *
 * On a phone it becomes an app screen: a profile header where the rail used
 * to be, practical facts under the lede, and a snap row of tiles in place of
 * the bento. The CTA leaves the head - the tab bar's Contact carries it.
 *
 * The tools band shows only once real tools are listed in data/tools.ts.
 */
export default function Home() {
  useScrollReveal()
  const phone = useIsPhone()
  const { displayName, hero } = profile
  const headline = `${displayName.line1} ${displayName.line2}`

  return (
    <section className="home" aria-labelledby="home-title">
      {phone && <HomeProfile />}

      <div className="home__head">
        <p className="home__role ed-eyebrow">{profile.role}</p>
        <div className="home__headline">
          <h1 className="home__title" id="home-title">
            <Copy text={headline} className="home__line" />
          </h1>

          {!phone && (
            <Link className="home__cta" to="/contact">
              Get in touch
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          )}
        </div>

        <Copy as="p" text={hero.body} className="home__lede" />
        {phone && <HomeStats />}
      </div>

      {tools.length > 0 && (
        <div className="home__glass home__glass--tools">
          <div className="home__tools">
            <div className="home__tools-head">
              <h2 className="home__tools-label">Tools I work with</h2>
            </div>
            <ToolsList />
          </div>
        </div>
      )}

      {phone ? (
        <HomeExplore />
      ) : (
        <div className="home__glass home__glass--showcase">
          <div className="home__showcase">
            <HomeBento />
          </div>
        </div>
      )}
    </section>
  )
}
