const dateFormat = webix.Date.strToDate("%Y-%m-%d");

export const contacts = new webix.DataCollection({
	url: "http://localhost:3012/contacts/",
	save: "rest->http://localhost:3012/contacts/",
	scheme: {
		$init: (obj) => {
			obj.value = `${obj.FullName}`;
			obj.Birthday = dateFormat(obj.Birthday);
		},

		$update: (obj) => {
			// obj.value = `${obj.FirstName} ${obj.LastName}`;
		},

		$save: (obj) => {
			delete obj.value;
		}
	}
});
