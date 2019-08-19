import red from "../img/red.png"
import grey from "../img/grey.png"
import green from "../img/green.png"
import orange from "../img/orange.png"


var browser = chrome || browser;

var currentDomain = null;
var currentDomainInfo = {};

var iconsMapping = {
    0: green,
    1: orange,
    2: red
}

// Initialize browser action badge style
browser.browserAction.setBadgeBackgroundColor(
    {
        color: "#273745"
    }
)

/**
 * intantiate a URL object from the passed string
 * @param  {string} url
 */
function extractDomain(url) {
    return (!!url.origin && url.hostname) || new Error(`${url.href} is not a valid domain`)
}

/**
 * Get information about the passed domain from the API
 * @param  {string} domain
 * @param  {int} activeTab
 */
function getDomainInfo(domain, activeTab) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if(xhr.status === 200) {
            currentDomainInfo = xhr.response;

            if (currentDomainInfo && currentDomainInfo.length === 1 && currentDomainInfo[0].simplifieds.length > 0) {
                const severityObject = {};
                let severity = null;
                currentDomainInfo[0].simplifieds.forEach((simplified) => {
                    severityObject[simplified.severity] = severityObject[simplified.severity] ? severityObject[simplified.severity] + 1 : 1;
                    if (severityObject[simplified.severity] > severity) {
                        severity = simplified.severity
                    }
                });
                setBrowserActionIcon(iconsMapping[severity]);
                setBrowserActionBadge(severityObject[severity], activeTab)
            } else {
                console.log('no domain info')
                setBrowserActionIcon(grey)    
            }
        } else {
            setBrowserActionIcon(grey)
        }
    }
    xhr.open("GET", `https://tldr-sails.herokuapp.com/tldr?uniqueName=privacy://${domain}`);
    xhr.send();
}

/**
 * sets the browser action icon based on the passed icon path
 * @param  {string} color : path of the image
 */
function setBrowserActionIcon(color) {
    browser.browserAction.setIcon(
        {
            path: color
        }
    )
}


/**
 * sets the badge text of the browser action
 * @param  {string} text
 * @param  {int} activeTab
 */
 function setBrowserActionBadge(text, activeTab) {
    browser.browserAction.setBadgeText(
        {
            text: `${text}`,
            tabId: activeTab
        }
    )
}


/**
 * return the current tab url to the browser action popup
 * @param  {} message
 * @param  {} sender
 * @param  {} sendRequest
 */
function getCurrentUrl(message, sender, sendRequest) {
    if (message.content !== 'get_current_tab_url') {
        return
    }
    browser.tabs.query(
        {
            active: true,
            windowId: browser.windows.WINDOW_ID_CURRENT
        },
        (tabs) => {
            browser.tabs.get(tabs[0].id , 
                tab => {
                    console.log(currentDomain)
                    sendRequest({
                        domainInfo: currentDomainInfo[0],
                        domain: currentDomain
                    })
                });
            }
    );
    return true;
}

browser.runtime.onMessage.addListener(getCurrentUrl)



/**
 * change browser action icon on URL change
 * @param  {int} activeTab
 */
browser.tabs.onUpdated.addListener((activeTab) => {
    // console.log(activeTab)
    browser.tabs.get(activeTab,
        (res) => {
            var domain = extractDomain(new URL(res.url))
            if (currentDomain !== domain) {
                currentDomain = domain
                getDomainInfo(domain, activeTab)
            }
        }
    )
})

/**
 * change browser action icon on tab change
 * @param  {} activeTab
 */
browser.tabs.onActivated.addListener((activeTab) => {
    browser.tabs.get(activeTab.tabId,
        (res) => {
            var domain = extractDomain(new URL(res.url))
            if (currentDomain !== domain) {
                currentDomain = domain
                getDomainInfo(domain, activeTab.tabId)
            }
        }
    )
})
