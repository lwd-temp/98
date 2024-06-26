
// TODO: bullet point style radio button menu items (instead of check marks)
var checkbox_for_view_mode = function (menu_item_view_mode) {
	return {
		check: ()=> folder_view ? folder_view.config.view_mode === menu_item_view_mode : false,
		toggle: ()=> {
			folder_view?.configure({ view_mode: menu_item_view_mode });
		},
		enabled: ()=> !!folder_view, // @TODO: hide the option entirely, don't just disable it
	};
};
var checkbox_for_sort_mode = function (menu_item_sort_mode) {
	return {
		check: ()=> folder_view ? folder_view.config.sort_mode === menu_item_sort_mode : false,
		toggle: ()=> {
			folder_view?.configure({ sort_mode: menu_item_sort_mode });
		},
		enabled: ()=> !!folder_view, // @TODO: hide the option entirely, don't just disable it
	};
};

// This menu is shared between the View menu and the Views toolbar button dropdown
var views_dropdown_menu_items = [
	// @TODO: make this option unavailable for the Desktop folder
	{
		label: "as &Web Page",
		checkbox: {
			check: ()=> folder_view ? folder_view.config.view_as_web_page : true,
			toggle: () => {
				folder_view?.configure({ view_as_web_page: !folder_view.config.view_as_web_page });
			},
			enabled: ()=> !!folder_view, // @TODO: hide the option entirely, don't just disable it
		},
		description: "Displays items in Web View",
	},
	MENU_DIVIDER,
	// {
	// 	label: "As Desktop (Debug)",
	// 	checkbox: checkbox_for_view_mode("DESKTOP"),
	// 	enabled: ()=> !!folder_view,
	// },
	// Thumbnails option can be enabled in folder Properties window.
	// {
	// 	label: "T&humbnails",
	// 	checkbox: checkbox_for_view_mode("THUMBNAIL"),
	// 	enabled: () => !!folder_view,
	// 	description: "Displays items using thumbnail view.",
	// },
	{
		label: "Lar&ge Icons",
		checkbox: checkbox_for_view_mode("LARGE_ICONS"),
		enabled: () => !!folder_view,
		description: "Displays items by using large icons.",
	},
	{
		label: "S&mall Icons",
		checkbox: checkbox_for_view_mode("SMALL_ICONS"),
		enabled: () => !!folder_view,
		description: "Displays items by using small icons.",
	},
	{
		label: "&List",
		checkbox: checkbox_for_view_mode("LIST"),
		enabled: () => !!folder_view,
		description: "Displays items in a list.",
	},
	{
		label: "&Details",
		checkbox: checkbox_for_view_mode("DETAILS"),
		// enabled: ()=> !!folder_view,
		enabled: false, // @TODO
		description: "Displays information about each item in the window.",
	},
];

var menus = {
	"&File": [
		// @TODO: os-gui should support descriptions for top level menus,
		// and in general treat them more like menus and submenus
		// description: "Contains commands for working with the selected items.",
		{
			label: "&New",
			submenu: [
				// @TODO: icons for these items
				{
					label: "&Folder",
					enabled: false, // @TODO
				},
				{
					label: "&Shortcut",
					enabled: false, // @TODO
				},
				MENU_DIVIDER,
				{
					label: "Text Document",
					enabled: false, // @TODO
				},
				{
					label: "WordPad Document",
					enabled: false, // @TODO
				},
				{
					label: "Bitmap Image",
					enabled: false, // @TODO
				},
				{
					label: "Wave Sound",
					enabled: false, // @TODO
				},
				{
					label: "Microsoft Data Link",
					enabled: false, // @TODO
				},
			],
		},
		MENU_DIVIDER,
		{
			label: "Create &Shortcut",
			enabled: false, // @TODO
			description: "Creates shortcuts to the selected items.",
		},
		{
			label: "&Delete",
			action: () => {
				folder_view.delete_selected();
			},
			description: "Deletes the selected items.",
		},
		{
			label: "Rena&me",
			action: () => {
				folder_view.start_rename();
			},
			description: "Renames the selected item.",
		},
		{
			label: "P&roperties",
			enabled: false, // @TODO
			description: "Displays the properties of the selected items.",
		},
		// @TODO: show history entries, oldest first
		// MENU_DIVIDER,
		// {
		// 	label: "(name of location)",
		// },
		MENU_DIVIDER,
		{
			label: "&Work Offline",
			checkbox: {
				check: () => offline_mode,
				toggle: () => {
					offline_mode = !offline_mode;
				},
			},
			description: "Shows Web pages without downloading them.",
		},
		{
			label: "&Close",
			action: function () {
				close();
			},
			description: "Closes the window.",
		},
	],
	"&Edit": [
		// description: "Contains edit commands.",
		{
			label: "&Undo", // @TODO: specific name per action too
			enabled: false, // @TODO
			// description: e.g. "Undo Rename of 'whatever.gif' to 'whatever.txt'",
		},
		MENU_DIVIDER,
		{
			label: "Cu&t",
			shortcut: "Ctrl+X",
			enabled: false, // @TODO
			description: "Removes the selected items and copies them onto the Clipboard.",
		},
		{
			label: "&Copy",
			shortcut: "Ctrl+C",
			enabled: false, // @TODO
			description: "Copies the selected items to the Clipboard. To put them in the new location, use the Paste command.",
		},
		{
			label: "&Paste",
			shortcut: "Ctrl+V",
			enabled: false, // @TODO
			description: "Inserts the items you have copied or cut into the selected location.",
		},
		{
			label: "Paste &Shortcut",
			enabled: false, // @TODO
			description: "Creates shortcuts to the items you have copied or cut into the selected location.",
		},
		MENU_DIVIDER,
		{
			label: "Select &All",
			shortcut: "Ctrl+A",
			action: function () {
				folder_view.select_all();
				folder_view.focus();
			},
			description: "Selects all items in window.",
		},
		{
			label: "&Invert Selection",
			action: function () {
				folder_view.select_inverse();
				folder_view.focus();
			},
			description: "Reverses which items are selected and which are not.",
		},
	],
	"&View": [
		// description: "Contains commands for manipulating the view.",
		{
			label: "&Toolbars",
			submenu: [
				{
					label: "&Standard Buttons",
					checkbox: {
						check: ()=> $("#standard-buttons-toolbar").is(":visible"),
						toggle: ()=> $("#standard-buttons-toolbar").toggle(),
					},
					description: "Displays the Standard Buttons toolbar.",
				},
				{
					label: "&Address Bar",
					checkbox: {
						check: ()=> $("#address-bar-toolbar").is(":visible"),
						toggle: ()=> $("#address-bar-toolbar").toggle(),
					},
					description: "Displays the Address bar.",
				},
				{
					label: "&Links",
					checkbox: {
						check: ()=> false,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
					description: "Displays the Quick Links bar.",
				},
				{
					label: "&Radio",
					checkbox: {
						check: ()=> false,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
				},
				MENU_DIVIDER,
				{
					label: "&Text Labels",
					checkbox: {
						check: ()=> !$("body").hasClass("hiding-label-text"),
						toggle: () => {
							$("body").toggleClass("hiding-label-text");
						},
					},
					description: "Adds a text label under each toolbar button.",
				},
			],
			description: "Shows or hides toolbars.",
		},
		{
			label: "Status &Bar",
			checkbox: {
				check: ()=> $("#status-bar").is(":visible"),
				toggle: () => {
					$("#status-bar").toggle();
				},
			},
			description: "Shows or hides the status bar.",
		},
		{
			label: "&Explorer Bar",
			submenu: [
				{
					label: "&Search",
					shortcut: "Ctrl+E",
					checkbox: {
						check: ()=> false,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
					description: "Shows the Search bar.",
				},
				{
					label: "&Favorites",
					shortcut: "Ctrl+I",
					checkbox: {
						check: ()=> false,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
					description: "Shows the Favorites bar.",
				},
				{
					label: "&History",
					shortcut: "Ctrl+H",
					checkbox: {
						check: ()=> false,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
					description: "Shows the History bar.",
				},
				{
					label: "F&olders",
					checkbox: {
						check: ()=> false,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
					description: "Shows the Folders bar.",
				},
				MENU_DIVIDER,
				{
					label: "&Tip of the Day",
					checkbox: {
						check: ()=> false,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
				},
			],
			description: "Shows or hides an Explorer bar.",
		},
		MENU_DIVIDER,
		...views_dropdown_menu_items,
		// MENU_DIVIDER,
		// {
		// 	label: "&Customize this Folder...",
		// 	enabled: ()=> folder_view &&...?
		// 	description: "Customizes the view of this folder.",
		// },
		MENU_DIVIDER,
		{
			label: "Arrange &Icons",
			submenu: [
				// @TODO: dynamic based on attributes available for the type of item
				// Name & Description for Control Panel items
				// Name, Type, Size, Date for files
				// etc.
				// These apparently are not checkboxes, by the way.
				{
					label: "by &Name",
					checkbox: checkbox_for_sort_mode("NAME"),
					description: "Sorts items alphabetically by name.",
				},
				{
					label: "by &Type",
					checkbox: checkbox_for_sort_mode("TYPE"),
					description: "Sorts items by type.",
				},
				{
					label: "by &Size",
					checkbox: checkbox_for_sort_mode("SIZE"),
					description: "Sorts items by size, from smallest to largest.",
				},
				{
					label: "by &Date",
					checkbox: checkbox_for_sort_mode("DATE"),
					description: "Sorts items by date, from oldest to most recent.",
				},
				MENU_DIVIDER,
				{
					label: "&Auto Arrange",
					checkbox: {
						check: ()=> true,
						toggle: ()=> {}, // @TODO
					},
					enabled: false, // @TODO
					description: "Arranges the icons automatically.",
				},
			],
			description: "Contains commands for arranging items in the window.",
		},
		{
			label: "Line &Up Icons",
			enabled: false, // @TODO
			description: "Arranges icons in a grid.",
		},
		MENU_DIVIDER,
		{
			label: "&Refresh",
			shortcut: "F5",
			action: () => {
				refresh();
			},
			description: "Refreshes the contents of the current pane.",
		},
		{
			label: "Folder &Options...",
			enabled: false, // @TODO
			description: "Enables you to change settings.",
		},
	],
	"&Go": [
		// description: "Contains commands for browsing to various pages.",
		{
			label: "&Back",
			shortcut: "Alt+Left Arrow",
			action: () => {
				go_back();
			},
			enabled: ()=> can_go_back(),
			description: "Goes to the previous page.",
		},
		{
			label: "&Forward",
			shortcut: "Alt+Right Arrow",
			action: () => {
				go_forward();
			},
			enabled: ()=> can_go_forward(),
			description: "Goes to the next page.",
		},
		{
			label: "&Up One Level",
			// shortcut: "Alt+Up Arrow",
			action: () => {
				go_up();
			},
			enabled: ()=> can_go_up(),
			description: "Goes up one level.",
		},
		MENU_DIVIDER,
		{
			label: "&Home Page",
			shortcut: "Alt+Home",
			action: () => {
				go_home();
			},
			description: "Goes to your home page.",
		},
		{
			label: "Channel &Guide",
			action: () => {
				// http://interdimensionalcable.io/ doesn't work because of HTTP vs HTTPS (Mixed Content)
				go_to("https://topotech.github.io/interdimensionalcable/");
			},
			description: "Opens the Channel Guide Web page.",
		},
		{
			label: "&Search the Web",
			action: () => {
				// Can you find a search engine that supports iframes?
				// This is a fun alternative, although it'd be nicer if it was thematic (i.e. retro)
				go_to("https://mrdoob.com/projects/chromeexperiments/google-gravity/index.html");
			},
		},
		MENU_DIVIDER,
		{
			label: "My &Computer",
			action: () => {
				// @TODO: a real My Computer location
				go_to("/");
			},
			description: "Opens My Computer.",
		},
		{
			label: "&Internet Call",
			action: () => {
				// @TODO: host a configured version in order to theme it,
				// maybe allow sharing individual windows on the 98.js desktop?
				// How much of NetMeeting should I implement? :P
				go_to("https://brie.fi/ng/98?audio=1&video=1&fs=0&invite=0&share=0&chat=1");
			},
			description: "Opens your Internet call and meeting program.",
		},
	],
	"F&avorites": [
		// description: "Displays the contents of your Favorites folder.",
		{
			label: "&Add to Favorites...",
			enabled: false, // @TODO
			description: "Adds the current page to your Favorites list.",
		},
		{
			label: "&Organize Favorites...",
			enabled: false, // @TODO
			description: "Opens the Favorites folder.",
		},
		MENU_DIVIDER,
		// @TODO: populate with favorites
		// description and tooltip should be the URL of the item
		{
			label: "(Empty)",
			enabled: false,
		},
	],
	"&Tools": [
		// @TODO: this shows up if Exploring (right click, Explore)
		// and differently if you're in Internet Explorer
		// and not at all if you're in a normal file explorer window
		// This is currently the Exploring version.
		// description: "Contains tools commands.",
		{
			label: "&Find",
			submenu: [
				{
					label: "&Files or Folders...",
					enabled: false, // @TODO
				},
				{
					label: "&Computer...",
					enabled: false, // @TODO
				},
				{
					label: "On the &Internet...",
					enabled: false, // @TODO
				},
			],
		},
		MENU_DIVIDER,
		{
			label: "Map &Network Drive...",
			enabled: false, // @TODO: could use BrowserFS Dropbox adapter
			description: "Connects to a network drive.",
		},
		{
			label: "&Disconnect Network Drive...",
			enabled: false, // @TODO
			description: "Disconnects from a network drive.",
		},
		{
			label: "&Synchronize...",
			enabled: false, // @TODO
			description: "Updates all offline content.",
		},
	],
	"&Help": [
		// description: "Contains commands for displaying Help.",
		{
			label: "&Help Topics",
			enabled: false, // @TODO
			description: "Opens Help.",
		},
		MENU_DIVIDER,
		{
			// label: "&About Windows 98",
			label: "&About 98.js.org",
			action: function () {
				// TODO: about dialog
				window.open("https://github.com/1j01/98#readme");
			},
			// description: "Displays program information, version number, and copyright.",
			description: "Opens the 98.js project Web page.",
		}
	],
};

// @TODO: let menus go outside the window (outside the iframe)
// This app is a bit special, because it has a menu bar that can be
// dragged around.

// var go_outside_frame = false;
// if (frameElement) {
// 	try {
// 		if (parent.MenuBar) {
// 			MenuBar = parent.MenuBar;
// 			go_outside_frame = true;
// 		}
// 	} catch (e) { }
// }
var menu_bar = new MenuBar(menus);
// if (go_outside_frame) {
// 	$(menu_bar.element).insertBefore(frameElement);
// } else {
// 	$(function () {
// 		$(menu_bar.element).prependTo("body");
// 	});
// }

$(function () {
	$("#menu-bar-toolbar").append(menu_bar.element);
});

$(menu_bar.element).on("info", (event) => {
	const status = event.detail?.description ?? "";
	$("#status-bar-simple").show();
	$("#status-bar-simple-text").text(status);
	$("#status-bar-left, #status-bar-middle, #status-bar-right").hide();
});
$(menu_bar.element).on("default-info", (event) => {
	$("#status-bar-left, #status-bar-middle, #status-bar-right").show();
	$("#status-bar-simple").hide();
});
