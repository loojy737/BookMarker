let siteName = document.getElementById('site-name');
let siteUrl = document.getElementById('site-url');
let sites = []
let siteItem = localStorage.getItem("sites");
let allBookmarkers = document.getElementById('bookmarks');



if(siteItem !== null) 
   sites = JSON.parse(siteItem);

UpdateView();

function UpdateView() {

    allBookmarkers.innerHTML = "";
    for(let i = 1;i <= sites.length;i++) {
        let siteDiv = GetSiteDiv(sites[i - 1], i);
        allBookmarkers.innerHTML += siteDiv;
    } 
}

function GetSiteDiv(site, siteNo) {
    let siteDiv =`
    <div id = "site${siteNo}" class="row">
        <div class="col">
           <p>${siteNo}</p>
        </div>
        <div class="col">
            <p>${site.name}</p>
        </div>
        <div class="col">
            <a href="${site.url}" class="btn btn-sm btn-success" target="_blank">
                <i class="fas fa-external-link-alt me-1 border-0"> 
                </i> Visit
            </a>
            
        </div>
           <div class="col">
            <button onclick="DeleteBookMark(${siteNo})" class="btn btn-sm btn-danger"> 
               <i class="fas fa-trash-alt me-1">
               </i> Delete
            </button>
        </div>
    </div>
    `;

    return siteDiv;

}


function AddBookMark() {

    if(!ValidateSiteName(siteName.value) || !ValidateSiteUrl(siteUrl.value)) {
        return;
    }
    newSite =  {
       name: siteName.value,
       url: siteUrl.value
    }

   sites.push(newSite);
   console.log(sites);
   localStorage.setItem("sites", JSON.stringify(sites));
   UpdateView();
   siteName.value = '';
   siteUrl.value = '';
   siteName.classList.remove('is-valid', 'is-invalid');
   siteUrl.classList.remove('is-valid', 'is-invalid');

}

function DeleteBookMark(siteId) {
    sites.splice(siteId - 1, 1);
    localStorage.setItem("sites", JSON.stringify(sites));
    UpdateView();
}


function ValidateSiteName() {
    let name = siteName.value;
    if(name.length < 5) {
        siteName.classList.remove('is-valid');
        siteName.classList.add('is-invalid');

        return false;
    }
    siteName.classList.add('is-valid');
    siteName.classList.remove('is-invalid');
    return true;
}

function ValidateSiteUrl() {
   let url = siteUrl.value;
   if(!URL.canParse(url)) {
        siteUrl.classList.remove('is-valid');
        siteUrl.classList.add('is-invalid');
         return false;
   }
    siteUrl.classList.add('is-valid');
    siteUrl.classList.remove('is-invalid');
    return true;
}
