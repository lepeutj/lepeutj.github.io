# Jérémy's portfolio

This is a static website. `index.html` contains the page content and styling; `projects.js` contains the project cards.

## Add a project

In `projects.js`, add an object to the `projects` list:

```js
{
  title: "Project name",
  description: "What the project does and the problem it solves.",
  tags: ["Python", "Docker"],
  diagram: ["input", "process", "output"],
  url: "https://github.com/lepeutj/nom-du-repo"
},
```

Keep the three `diagram` labels short. The card and project count update automatically when the new `projects.js` is published with the page. The cards need no API key and do not depend on GitHub being available. The "See all my GitHub repositories" link also gives visitors access to new repositories before you add a card for them.
