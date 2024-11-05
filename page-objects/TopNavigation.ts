class TopNavigation {

    getLinkLocator(page, title){
        return page.getByRole('link', { name: title });
    }

    getLinkLocatorExactName(page, title, exactName: boolean){
        return page.getByRole('link', { name: title, exact: exactName });
    }

}

export default TopNavigation;