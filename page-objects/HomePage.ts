import BasePage from "./BasePage";

class HomePage extends BasePage{

    getHeadingName(page, title){
        return page.getByRole('heading', { name: title });
    }

}

export default HomePage;