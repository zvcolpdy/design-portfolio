import page from "./pageItems"

//home page
page.homeButton.addEventListener('click', () => {
	page.main.style.display = "block";
	page.about.style.display = "none";
})

//about page
page.aboutButton.addEventListener('click', () => {
	page.main.style.display = "none";
	page.about.style.display = "block";
})

page.hideFooter.addEventListener('click', () => {
	page.footer.style.display = "none";
})