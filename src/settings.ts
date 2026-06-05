export const profile = {
	fullName: 'Isaac Weintraub',
	title: 'Senior Electronics Engineer',
	institute: 'Autonomous Controls Branch, Power and Control Division',
	author_name: 'Isaac Weintraub', // Author name to be highlighted in the papers section
	research_areas: [
		{
			title: 'PursuitEvasion and Differential Games',
			description:
				'Modeling and analysis of multiagent pursuitevasion interactions, with an emphasis on engagement geometry, optimal evasion strategies, and differential game formulations.',
			field: 'mathematics',
		},
		{
			title: 'Guidance, Navigation, and Control',
			description:
				'Design of guidance and control laws for autonomous vehicles, including engagement zone management, interception, and cooperative multiagent behaviors.',
			field: 'engineering',
		},
		{
			title: 'Unmanned Aerial Vehicle Swarms',
			description:
				'Distributed decisionmaking and control for UAV teams, focusing on containment, surveillance, and resilient operation under sensing and communication constraints.',
			field: 'computer-science',
		},
		{
			title: 'Optimal Control and Trajectory Design',
			description:
				'Numerical optimal control and trajectory optimization for constrained engagement scenarios, including path planning in complex threat environments.',
			field: 'mathematics',
		},
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: '',
	linkedin: '',
	x: 'https://www.x.com/',
	bluesky: '',
	github: '',
	gitlab: '',
	scholar: '',
	inspire: '',
	arxiv: '',
	orcid: '',
}

export const template = {
	website_url: 'https://isaacew.github.io', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
	base: '/', // Deploy at repo root
}

export const seo = {
	default_title: 'Astro Academia',
	default_description: 'Astro Academia is a template for academic websites.',
	default_image: '/images/astro-academia.png',
}
