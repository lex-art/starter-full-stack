import { Typography } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function TypographyPage() {
	const t = useTranslations()
	return (
		<>
			<Typography variant="h2" muted>
				{t('elements.typography')}
			</Typography>
			<div className="grid auto-rows-max gap-4 lg:grid-cols-2">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h1">Variants</Typography>
					<Typography variant="h1">{t('elements.h1')}</Typography>
					<Typography variant="h2">{t('elements.h2')}</Typography>
					<Typography variant="h3">{t('elements.h3')}</Typography>
					<Typography variant="h4">{t('elements.h4')}</Typography>
					<Typography variant="small">{t('elements.small')}</Typography>
					<Typography variant="large">{t('elements.large')}</Typography>
					<Typography variant="body">{t('elements.body')}</Typography>
					<Typography variant="blockquote">
						{t('elements.blockquote')}
					</Typography>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50 p-4 ">
					<div>
						<Typography variant="h1" weight="extrabold">
							The Joke Tax Chronicles
						</Typography>
						<Typography>
							Once upon a time, in a far-off land, there was a very lazy
							king who spent all day lounging on his throne. One day, his
							advisors came to him with a problem: the kingdom was running
							out of money.
						</Typography>
						<Typography className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
							The King&apos;s Plan
						</Typography>
						<Typography>
							The king thought long and hard, and finally came up with{' '}
							<Link
								href="/#"
								className="font-medium text-primary underline underline-offset-4"
							>
								a brilliant plan
							</Link>
							: he would tax the jokes in the kingdom.
						</Typography>
						<Typography variant="blockquote">
							&quot;After all,&quot; he said, &quot;everyone enjoys a good
							joke, so itg&apos;s only fair that they should pay for the
							privilege.&quot;
						</Typography>
						<Typography variant="h3" weight="semibold" className="mt-8">
							The Joke Tax
						</Typography>
						<Typography>
							The king&apos;s subjects were not amused. They grumbled and
							complained, but the king was firm:
						</Typography>
						<Typography variant="list">
							<li>1st level of puns: 5 gold coins</li>
							<li>2nd level of jokes: 10 gold coins</li>
							<li>3rd level of one-liners : 20 gold coins</li>
						</Typography>
						<Typography>
							As a result, people stopped telling jokes, and the kingdom
							fell into a gloom. But there was one person who refused to
							let the king&apos;s foolishness get him down: a court jester
							named Jokester.
						</Typography>
						<Typography variant="h3" weight="semibold" className="mt-8">
							Jokester&apos;s Revolt
						</Typography>
						<Typography>
							Jokester began sneaking into the castle in the middle of the
							night and leaving jokes all over the place: under the
							king&apos;s pillow, in his soup, even in the royal toilet.
							The king was furious, but he couldn&apos;t seem to stop
							Jokester.
						</Typography>
						<Typography>
							And then, one day, the people of the kingdom discovered that
							the jokes left by Jokester were so funny that they
							couldn&apos;t help but laugh. And once they started laughing,
							they couldn&apos;t stop.
						</Typography>
						<Typography variant="h3" weight="semibold" className="mt-8">
							The People&apos;s Rebellion
						</Typography>
						<Typography>
							The people of the kingdom, feeling uplifted by the laughter,
							started to tell jokes and puns again, and soon the entire
							kingdom was in on the joke.
						</Typography>
						<Typography>
							The king, seeing how much happier his subjects were, realized
							the error of his ways and repealed the joke tax. Jokester was
							declared a hero, and the kingdom lived happily ever after.
						</Typography>
						<Typography>
							The moral of the story is: never underestimate the power of a
							good laugh and always be careful of bad ideas.
						</Typography>
					</div>
				</div>
				<div className="w-full h-full rounded-xl bg-muted/50" />
				<div className="w-full h-full rounded-xl bg-muted/50" />
			</div>
		</>
	)
}
