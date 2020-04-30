import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";

export default class SaveForm extends JetView {
	config() {
		return {
			view: "window",
			position: "center",
			modal: true,
			id: "window",
			move: true,
			width: 500,
			head: {
				cols: [
					{template: "Add (*edit) activity", type: "header", borderless: true, localId: "headerWindow"},
					{view: "icon",
						icon: "wxi-close",
						tooltip: "Close window",
						click: () => this.closeWindow()
					}
				]
			},
			body: {
				view: "form",
				padding: 10,
				localId: "editForm",
				elements: [
					{
						view: "text",
						name: "FullName",
						placeholder: "Full Name",
						label: "Full Name"
					},
					{
						view: "text",
						label: "Position",
						name: "Position",
						placeholder: "Position"
					},
					{
						view: "text",
						name: "Address",
						placeholder: "Address",
						label: "Address"
					},
					{
						view: "text",
						name: "Phone",
						placeholder: "628x xxxx xxxx",
						label: "Phone"
					},
					{
						view: "text",
						name: "Email",
						placeholder: "email@email.com",
						label: "Email"
					},
					{
						view: "datepicker",
						name: "Birthday",
						placeholder: "dd/mm/YYYY",
						label: "Birthday"
					},
					{
						cols: [
							{},
							{
								view: "button",
								localId: "onSave",
								label: "Add (*save)",
								autowidth: true,
								css: "webix_primary",
								click: this.onSaveClick
							},
							{
								view: "button",
								label: "Cancel",
								autowidth: true,
								click: () => this.closeWindow()
							}
						]
					}
				],
				rules: {
					FullName: webix.rules.isNotEmpty,
					Position: webix.rules.isNotEmpty,
					Phone: webix.rules.isNumber,
					Email: webix.rules.isEmail,
					Birthday: value => value < new Date() && value !== null
				}
			}
		};
	}

	showWindow(id) {
		this.getRoot().show();
		this.id = id;
		let mode = this.id ? "Edit" : "Add";
		const button = this.$$("onSave");
		button.define("label", mode);
		button.resize();
		this.$$("headerWindow").setHTML(`${mode} ${"activity"}`);
		contacts.waitData.then(() => {
			const formView = this.$$("editForm");
			if (this.id) formView.setValues(contacts.getItem(this.id));
		});
	}

	closeWindow() {
		const formView = this.$$("editForm");
		formView.clear();
		formView.clearValidation();
		this.getRoot().hide();
	}

	onSaveClick() {
		const formView = this.getFormView();
		if (formView.validate()) {
			if (!this.$scope.id) {
				contacts.add(formView.getValues());
			}
			else {
				contacts.updateItem(this.$scope.id, formView.getValues());
			}
			this.$scope.closeWindow();
		}
	}
}
