const dateFormat = webix.Date.strToDate("%Y-%m-%d %H-%i-%s");

export const interview = new webix.DataCollection({
	url: "http://localhost:3012/interview/",
	save: "rest->http://localhost:3012/interview/",

	scheme: {
		$init: (obj) => {
			obj.Date = dateFormat(obj.Date);
		}
	}
});
