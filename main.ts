
let brwoseCategoryButton : HTMLDivElement | null = document.querySelector(".buttom_header .container .category_nav .category_button")
let categoryNavList : HTMLDivElement | null = document.querySelector(".buttom_header .container .category_nav .category_nav_list")

if(brwoseCategoryButton !== null)
{
    brwoseCategoryButton.addEventListener("click", function(){
        if(categoryNavList !== null)
        {       
            if(!categoryNavList.classList.contains("active"))
                categoryNavList.classList.add("active");
            else
                categoryNavList.classList.remove("active")
        }
    })
}
