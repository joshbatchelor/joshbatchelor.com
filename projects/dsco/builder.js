var selectedMethod='';
var selectedDeliveryMethod='';
var selectedColor = '';
var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'builder-container',
    width: 960,
    height: 650,
});
Konva.showWarnings = false;

var mainLayer = new Konva.Layer();
var routesLayer = new Konva.Layer();
var consumerLayer = new Konva.Layer();
var layer = new Konva.Layer();
var inventoryLayer = new Konva.Layer();
var deliveryOptionLayer = new Konva.Layer();
var yourConnectionsLayer = new Konva.Layer();
var dscoLayer = new Konva.Layer();
stage.add(mainLayer);
stage.add(routesLayer);
stage.add(consumerLayer);
stage.add(deliveryOptionLayer);
stage.add(layer);
stage.add(inventoryLayer);
stage.add(yourConnectionsLayer);
stage.add(dscoLayer);

var enabled = [];
var enabledInventory = [];

deliveryOptionLayer.clearBeforeDraw(true);
var dropShipMenuItems = [
    {
        'option':'not_sure',
        'image':'images/1x/question_mark.png',
        'hover':'images/1x/question_mark-over.png',
        'title':'I\'M NOT SURE'
    },
    {
        'option':'small_parcel',
        'image':'images/2x/do-small-parcel.png',
        'hover':'images/2x/do-small-parcel-over.png',
        'title':'SMALL PARCEL'
    },
    {
        'option':'ltl',
        'image':'images/2x/do-ltl.png',
        'hover':'images/2x/do-ltl-over.png',
        'title':'LTL FREIGHT'
    },
    {
        'option':'courier',
        'image':'images/2x/do-courier.png',
        'hover':'images/2x/do-courier-over.png',
        'title':'COURIER'
    },
    {
        'option':'white_glove',
        'image':'images/2x/do-white-glove.png',
        'hover':'images/2x/do-white-glove-over.png',
        'title':'WHITE GLOVE'
    }
];
function clearLayers() {
    layer.destroyChildren();
    routesLayer.destroyChildren();
    deliveryOptionLayer.destroyChildren();
    yourConnectionsLayer.destroyChildren();
    dscoLayer.destroyChildren();
}

// main API:
Konva.Image.fromURL('images/1x/grid.png', function (image) {
    image.setAttrs({
        x: 0,
        y: 60,
        width: 935,
        height: 550,
    });
    mainLayer.add(image);
    image.zIndex(0);
    mainLayer.batchDraw();
});
var home = Konva.Image.fromURL('images/1x/consumer.png', function (image) {
    image.setAttrs({
        x: 430,
        y: 275,
        width: 98,
        height: 85,
        opacity: 0,
    });
    consumerLayer.add(image);
    image.to({opacity: 1});
    image.zIndex(3);
    consumerLayer.batchDraw();
});

function chosenPath(option) {
    var image = option + '_' + selectedColor;
    if (option == 'dropship') {
        image = "dropship_solution";
    } else if (option == 'build') {
        image = "gears";
    }
    clearLayers();
    Konva.Image.fromURL('images/1x/' + image + '.png', function (image) {
        image.setAttrs({
            x: 20,
            y: 20,
            opacity: 0,
            id: 'chosenPath',
        });
        layer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        layer.batchDraw();
    });
}
function partner3pl() {
    Konva.Image.fromURL('images/1x/partner_3pl.svg', function (image) {
        image.setAttrs({
            x: 580,
            y: 135,
            width: 104,
            height: 89,
            opacity: 0,
            id: 'partner3PL',
        });
        layer.add(image);
        image.zIndex(5);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 680,
        y: 130,
        text: 'PARTNER\n    3PLs',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function partner3plInventory() {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 580,
            y: 165,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'partner3plInventory',
        });
        inventoryLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function partner3plAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 595,
            y: 122,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'partner3plAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function partner3plDSCO() {
    Konva.Image.fromURL('images/1x/antenna_1.svg', function (image) {
        image.setAttrs({
            x: 625,
            y: 115,
            width: 19,
            height: 69,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/dsco_solution/partner_solution_2.svg', function (image) {
        image.setAttrs({
            x: 550,
            y: 120,
            width: 86,
            height: 110,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
}
function partnerFactory(selectedColor) {
    Konva.Image.fromURL('images/1x/partner_factory.svg', function (image) {
        image.setAttrs({
            x: 429,
            y: 15,
            width: 92,
            height: 118,
            opacity: 0,
            id: 'partnerFactory',
        });
        layer.add(image);
        image.zIndex(5);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 525,
        y: 35,
        text: ' PARTNER\nFACTORIES',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function partnerFactoryInventory() {
    Konva.Image.fromURL('images/1x/inventory_'+ selectedColor +'.svg', function (image) {
        image.setAttrs({
            x: 475,
            y: 70,
            width: 41,
            height: 42,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function partnerFactoryInventoryPartner() {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 430,
            y: 70,
            width: 41,
            height: 42,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function partnerFactoryDSCO() {
    Konva.Image.fromURL('images/1x/antenna_1.svg', function (image) {
        image.setAttrs({
            x: 480,
            y: 10,
            width: 19,
            height: 69,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
    Konva.Image.fromURL('images/2x/line_partner_6.png', function (image) {
        image.setAttrs({
            x: 485,
            y: 5,
            width: 46,
            height: 217,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
}
function partnerFactoryAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 455,
            y: 16,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function partnerWarehouse() {
    Konva.Image.fromURL('images/1x/partner_warehouse.svg', function (image) {
        image.setAttrs({
            x: 505,
            y: 85,
            width: 92,
            height: 91,
            opacity: 0,
        });
        layer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 600,
        y: 80,
        text: '    PARTNER\nWAREHOUSES',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function partnerWarehouseInventory() {
    Konva.Image.fromURL('images/1x/inventory_'+ selectedColor +'.svg', function (image) {
        image.setAttrs({
            x: 550,
            y: 115,
            width: 41,
            height: 42,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function partnerWarehouseInventoryPartner() {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 505,
            y: 115,
            width: 41,
            height: 42,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function partnerWarehouseAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 520,
            y: 70,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function partnerWarehouseDSCO() {
    Konva.Image.fromURL('images/1x/antenna_1.svg', function (image) {
        image.setAttrs({
            x: 555,
            y: 70,
            width: 19,
            height: 69,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/partner_solution5.png', function (image) {
        image.setAttrs({
            x: 515,
            y: 70,
            width: 51,
            height: 178,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
}
function partnerWebsite() {
    Konva.Image.fromURL('images/1x/partner_website.svg', function (image) {
        image.setAttrs({
            x: 680,
            y: 172,
            width: 58,
            height: 89,
            opacity: 0,
        });
        layer.add(image);
        image.zIndex(5);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 755,
        y: 185,
        text: 'PARTNER\n WEBSITE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function partnerWebsiteAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 680,
            y: 160,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function partnerWebsiteDSCO() {
    Konva.Image.fromURL('images/1x/antenna_1.svg', function (image) {
        image.setAttrs({
            x: 680,
            y: 160,
            width: 19,
            height: 69,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/dsco_solution/partner_solution_3.svg', function (image) {
        image.setAttrs({
            x: 595,
            y: 160,
            width: 100,
            height: 127,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
}
function partnerStore() {
    Konva.Image.fromURL('images/1x/partner_store.svg', function (image) {
        image.setAttrs({
            x: 817,
            y: 273,
            width: 103,
            height: 91,
            opacity: 0,
            id: 'partnerStore',
        });
        layer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 905,
        y: 260,
        text: 'PARTNER\n STORE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function partnerStoreDSCO() {
    Konva.Image.fromURL('images/1x/antenna_1.svg', function (image) {
        image.setAttrs({
            x: 680,
            y: 160,
            width: 19,
            height: 69,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/dsco_solution/partner_solution_3.svg', function (image) {
        image.setAttrs({
            x: 595,
            y: 160,
            width: 100,
            height: 127,
            opacity: 0,
        });
        dscoLayer.add(image);
        image.zIndex(10);
        image.to({opacity: 1});
        dscoLayer.batchDraw();
    });
}
function partnerStoreInventory() {
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 825,
            y: 313,
            width: 41,
            height: 42,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function partnerStoreInventoryPartner() {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 870,
            y: 313,
            width: 41,
            height: 42,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function partnerStoreAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 823,
            y: 258,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'partner3plAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
// My Section
function allMyStores(selectedColor) {
    myStore1(selectedColor);
    myStore2(selectedColor);
    myStore3(selectedColor);
    myStore4(selectedColor);
}
function myStore1(selectedColor) {
    Konva.Image.fromURL('images/1x/store_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 420,
            y: 510,
            width: 103,
            height: 91,
            opacity: 0,
            id: 'myStore1',
        });
        layer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 510,
        y: 590,
        text: 'YOUR\nSTORE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function myStore1Inventory(selectedColor) {
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 440,
            y: 550,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myStore1Inventory',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myStore1InventoryPartner(selectedColor) {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 480,
            y: 530,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myStore1InventoryPartner',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myStore1DSCOColor() {
    Konva.Image.fromURL('images/1x/dsco_solution/'+ selectedColor+'_solution_f.svg', function (image) {
        image.setAttrs({
            x: 380,
            y: 355,
            width: 64,
            height: 179,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myStore1DSCO() {
    Konva.Image.fromURL('images/1x/wires/store_solution_2.svg', function (image) {
        image.setAttrs({
            x: 380,
            y: 355,
            width: 64,
            height: 179,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myStore1Antennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 453,
            y: 488,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function myStore1Connections() {
    myStore1Antennae()
    if (enabled.includes("partnerFactory")) {
        Konva.Image.fromURL('images/1x/wires/F-1.svg', function (image) {
            image.setAttrs({
                x: 415,
                y: 20,
                width: 100,
                height: 490,
                opacity: 0,
                id: 'myStore1Connection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerWarehouse")) {
        Konva.Image.fromURL('images/1x/wires/F-2.svg', function (image) {
            image.setAttrs({
                x: 458,
                y: 73,
                width: 110,
                height: 430,
                opacity: 0,
                id: 'myStore1Connection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partner3PL")) {
        Konva.Image.fromURL('images/1x/wires/F-3.svg', function (image) {
            image.setAttrs({
                x: 484,
                y: 123,
                width: 150,
                height: 370,
                opacity: 0,
                id: 'myStore1Connection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabledInventory.includes("partnerWebsite")) {
        Konva.Image.fromURL('images/1x/wires/F-4.svg', function (image) {
            image.setAttrs({
                x: 480,
                y: 170,
                width: 245,
                height: 340,
                opacity: 0,
                id: 'myStore1Connection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerStore")) {
        Konva.Image.fromURL('images/1x/wires/F-5.svg', function (image) {
            image.setAttrs({
                x: 495,
                y: 260,
                width: 370,
                height: 239,
                opacity: 0,
                id: 'myStore1Connection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
}
function myStore1Connections3() {
    Konva.Image.fromURL('images/1x/antenna_3.svg', function (image) {
        image.setAttrs({
            x: 450,
            y: 510,
            width: 42,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/wires/F-1.svg', function (image) {
        image.setAttrs({
            x: 415,
            y: 45,
            width: 96,
            height: 485,
            opacity: 0,
        });
        yourConnectionsLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/wires/F-2.svg', function (image) {
        image.setAttrs({
            x: 455,
            y: 95,
            width: 122,
            height: 429,
            opacity: 0,
        });
        yourConnectionsLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/wires/F-3.svg', function (image) {
        image.setAttrs({
            x: 485,
            y: 140,
            width: 176,
            height: 374,
            opacity: 0,
        });
        yourConnectionsLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function myStore2(selectedColor) {   
    Konva.Image.fromURL('images/1x/store_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 503,
            y: 463,
            width: 103,
            height: 91,
            opacity: 0,
            id: 'myStore2',
        });
            
        layer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        layer.batchDraw(); 
    });
    var text = new Konva.Text({
        x: 580,
        y: 545,
        text: 'YOUR\nSTORE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function myStore2Inventory(selectedColor) {   
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 523,
            y: 500,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myStore2Inventory',
        });
            
        inventoryLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
            
    });
}
function myStore2DSCO() {
    Konva.Image.fromURL('images/1x/wires/store_solution_2.svg', function (image) {
        image.setAttrs({
            x: 380,
            y: 355,
            width: 130,
            height: 143,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myStore3(selectedColor) {
    Konva.Image.fromURL('images/1x/store_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 583,
            y: 416,
            width: 103,
            height: 91,
            opacity: 0,
            id: 'myStore3',
        });
        layer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 650,
        y: 505,
        text: 'YOUR\nSTORE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function myStore3Inventory(selectedColor) {
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 600,
            y: 456,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myStore3Inventory',
        });
        inventoryLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myStore3DSCO() {
    Konva.Image.fromURL('images/1x/wires/store_solution_3.svg', function (image) {
        image.setAttrs({
            x: 380,
            y: 355,
            width: 210,
            height: 95,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myStore4(selectedColor) {
    Konva.Image.fromURL('images/1x/store_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 660,
            y: 368,
            width: 103,
            height: 91,
            opacity: 0,
            id: 'myStore4',
        });
        layer.add(image);
        image.zIndex(5);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 730,
        y: 455,
        text: 'YOUR\nSTORE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function myStore4Inventory(selectedColor) {
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 680,
            y: 410,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myStore4Inventory',
        });
        inventoryLayer.add(image);
        image.zIndex(7);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myStore4InventoryPartner() {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 720,
            y: 390,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myStore4Inventory',
        });
        inventoryLayer.add(image);
        image.zIndex(7);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myStore4DSCO() {
    Konva.Image.fromURL('images/1x/wires/store_solution_4.svg', function (image) {
        image.setAttrs({
            x: 380,
            y: 355,
            width: 330,
            height: 31,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myFactory(selectedColor) {
    Konva.Image.fromURL('images/1x/factory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 20,
            y: 245,
            width: 92,
            height: 118,
            opacity: 0,
            id: 'myFactory',
        });
        layer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 0,
        y: 360,
        text: 'YOUR\nFACTORY',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function myFactoryInventory(selectedColor) {
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 20,
            y: 315,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myFactoryInventory',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myFactoryDSCO() {
    Konva.Image.fromURL('images/1x/dsco_solution/'+ selectedColor+'_solution_a.svg', function (image) {
        image.setAttrs({
            x: 110,
            y: 310,
            width: 275,
            height: 49,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myFactoryInventoryPartner(selectedColor) {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 65,
            y: 315,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myFactoryInventoryPartner',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myFactoryAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 45,
            y: 255,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function myFactoryConnections() {
    myFactoryAntennae();
    if (enabled.includes("partnerFactory")) {
        Konva.Image.fromURL('images/1x/wires/A-1.svg', function (image) {
            image.setAttrs({
                x: 50,
                y: 20,
                width: 450,
                height: 256,
                opacity: 0,
                id: 'myFactoryConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerWarehouse")) {
        Konva.Image.fromURL('images/1x/wires/A-2.svg', function (image) {
            image.setAttrs({
                x: 63,
                y: 75,
                width: 500,
                height: 193,
                opacity: 0,
                id: 'myFactoryConnection2',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partner3PL")) {
        Konva.Image.fromURL('images/1x/wires/A-3.svg', function (image) {
            image.setAttrs({
                x: 75,
                y: 115,
                width: 560,
                height: 150,
                opacity: 0,
                id: 'myFactoryConnection3',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabledInventory.includes("partnerWebsite")) {
        Konva.Image.fromURL('images/1x/wires/A-4.svg', function (image) {
            image.setAttrs({
                x: 73,
                y: 133,
                width: 650,
                height: 144,
                opacity: 0,
                id: 'myFactoryConnection3',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerStore")) {
        Konva.Image.fromURL('images/1x/wires/A-5.svg', function (image) {
            image.setAttrs({
                x: 85,
                y: 225,
                width: 780,
                height: 96,
                opacity: 0,
                id: 'myFactoryConnection3',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
}
function myWarehouse(selectedColor) {
    Konva.Image.fromURL('images/1x/warehouse_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 105,
            y: 320,
            width: 92,
            height: 91,
            opacity: 0,
            id: 'myWarehouse',
        });
        layer.add(image);
        image.zIndex(0);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 40,
        y: 400,
        text: 'YOUR\nWAREHOUSE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function myWarehouseDSCO() {
    Konva.Image.fromURL('images/1x/dsco_solution/'+ selectedColor+'_solution_b.svg', function (image) {
        image.setAttrs({
            x: 196,
            y: 350,
            width: 185,
            height: 10,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myWarehouseInventory(selectedColor) {
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 105,
            y: 360,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myWarehouseInventory',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myWarehouseInventoryPartner(selectedColor) {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 150,
            y: 360,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'myWarehouseInventoryPartner',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function myWarehouseAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 125,
            y: 300,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function myWarehouseConnections() {
    myWarehouseAntennae();
    if (enabled.includes("partnerFactory")) {
        Konva.Image.fromURL('images/1x/wires/B-1.svg', function (image) {
            image.setAttrs({
                x: 128,
                y: 18,
                width: 370,
                height: 305,
                opacity: 0,
                id: 'myFactoryConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerWarehouse")) {
        Konva.Image.fromURL('images/1x/wires/B-2.svg', function (image) {
            image.setAttrs({
                x: 145,
                y: 75,
                width: 420,
                height: 238,
                opacity: 0,
                id: 'myFactoryConnection2',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partner3PL")) {
        Konva.Image.fromURL('images/1x/wires/B-3.svg', function (image) {
            image.setAttrs({
                x: 158,
                y: 125,
                width: 475,
                height: 181,
                opacity: 0,
                id: 'myFactoryConnection2',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabledInventory.includes("partnerWebsite")) {
        Konva.Image.fromURL('images/1x/wires/B-4.svg', function (image) {
            image.setAttrs({
                x: 150,
                y: 162,
                width: 573,
                height: 160,
                opacity: 0,
                id: 'myFactoryConnection2',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerStore")) {
        Konva.Image.fromURL('images/1x/wires/B-5.svg', function (image) {
            image.setAttrs({
                x: 167,
                y: 237,
                width: 698,
                height: 107,
                opacity: 0,
                id: 'myFactoryConnection2',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
}
function my3pl(selectedColor) {
    Konva.Image.fromURL('images/1x/3pl_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 175,
            y: 366,
            width: 104,
            height: 89,
            opacity: 0,
            id: 'myWarehouse',
        });
        layer.add(image);
        image.zIndex(0);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 140,
        y: 450,
        text: 'YOUR\n3PL',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function my3plDSCO() {
    Konva.Image.fromURL('images/1x/dsco_solution/'+ selectedColor+'_solution_c_1.svg', function (image) {
        image.setAttrs({
            x: 270,
            y: 358,
            width: 110,
            height: 31,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function my3plInventory(selectedColor) {
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 175,
            y: 405,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'my3plInventory',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function my3plInventoryPartner(selectedColor) {
    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 220,
            y: 405,
            width: 41,
            height: 42,
            opacity: 0,
            id: 'my3plInventoryPartner',
        });
        inventoryLayer.add(image);
        image.zIndex(3);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
}
function my3plAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 210,
            y: 345,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function my3plConnections() {
    my3plAntennae();
    if (enabled.includes("partnerFactory")) {
        Konva.Image.fromURL('images/1x/wires/C-1.svg', function (image) {
            image.setAttrs({
                x: 215,
                y: 18,
                width: 285,
                height: 350,
                opacity: 0,
                id: 'my3plConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerWarehouse")) {
        Konva.Image.fromURL('images/1x/wires/C-2.svg', function (image) {
            image.setAttrs({
                x: 228,
                y: 76,
                width: 338,
                height: 282,
                opacity: 0,
                id: 'my3plConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partner3PL")) {
        Konva.Image.fromURL('images/1x/wires/C-3.svg', function (image) {
            image.setAttrs({
                x: 240,
                y: 126,
                width: 400,
                height: 225,
                opacity: 0,
                id: 'my3plConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabledInventory.includes("partnerWebsite")) {
        Konva.Image.fromURL('images/1x/wires/C-4.svg', function (image) {
            image.setAttrs({
                x: 236,
                y: 163,
                width: 490,
                height: 206,
                opacity: 0,
                id: 'my3plConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerStore")) {
        Konva.Image.fromURL('images/1x/wires/C-5.svg', function (image) {
            image.setAttrs({
                x: 250,
                y: 249,
                width: 615,
                height: 116,
                opacity: 0,
                id: 'my3plConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });
    }
}
function myCallCenter(selectedColor) {
    Konva.Image.fromURL('images/1x/callcenter_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 275,
            y: 410,
            width: 68,
            height: 77,
            opacity: 0,
            id: 'myCallCenter',
        });
        layer.add(image);
        image.zIndex(5);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 205,
        y: 500,
        text: '  YOUR CALL\nCENTER',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}
function myCallCenterDSCO() {
    Konva.Image.fromURL('images/1x/dsco_solution/'+ selectedColor+'_solution_c.svg', function (image) {
        image.setAttrs({
            x: 333,
            y: 357,
            width: 52,
            height: 66,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function myCallCenterAntennae() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 295,
            y: 380,
            width: 50,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function myCallCenterConnections() {
    myCallCenterAntennae();
    if (enabled.includes("partnerFactory")) {
        Konva.Image.fromURL('images/1x/wires/D-1.svg', function (image) {
            image.setAttrs({
                x: 300,
                y: 20,
                width: 195,
                height: 380,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerWarehouse")) {
        Konva.Image.fromURL('images/1x/wires/D-2.svg', function (image) {
            image.setAttrs({
                x: 312,
                y: 75,
                width: 257,
                height: 320,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partner3PL")) {
        Konva.Image.fromURL('images/1x/wires/D-3.svg', function (image) {
            image.setAttrs({
                x: 328,
                y: 125,
                width: 310,
                height: 259,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabledInventory.includes("partnerWebsite")) {
        Konva.Image.fromURL('images/1x/wires/D-4.svg', function (image) {
            image.setAttrs({
                x: 322,
                y: 165,
                width: 400,
                height: 239,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerStore")) {
        Konva.Image.fromURL('images/1x/wires/D-5.svg', function (image) {
            image.setAttrs({
                x: 338,
                y: 258,
                width: 522,
                height: 136,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
}
function myWebsite(selectedColor) {
    Konva.Image.fromURL('images/1x/website_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 370,
            y: 460,
            width: 58,
            height: 88,
            opacity: 0,
            id: 'myWebsite',
        });
        layer.add(image);
        image.zIndex(5);
        image.to({opacity: 1});
        layer.batchDraw();
    });
    var text = new Konva.Text({
        x: 310,
        y: 555,
        text: 'YOUR\nWEBSITE',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    layer.add(text);
}

function myWebsiteAntenna() {
    Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
        image.setAttrs({
            x: 373,
            y: 440,
            width: 42,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function myWebsiteConnections() {
    myWebsiteAntenna();
    if (enabled.includes("partnerFactory")) {
        Konva.Image.fromURL('images/1x/wires/E-1.svg', function (image) {
            image.setAttrs({
                x: 360,
                y: 18,
                width: 141,
                height: 445,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerWarehouse")) {
        Konva.Image.fromURL('images/1x/wires/E-2.svg', function (image) {
            image.setAttrs({
                x: 388,
                y: 75,
                width: 175,
                height: 380,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partner3PL")) {
        Konva.Image.fromURL('images/1x/wires/E-3.svg', function (image) {
            image.setAttrs({
                x: 398,
                y: 125,
                width: 240,
                height: 320,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabledInventory.includes("partnerWebsite")) {
        Konva.Image.fromURL('images/1x/wires/E-4.svg', function (image) {
            image.setAttrs({
                x: 395,
                y: 167,
                width: 330,
                height: 295,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
    if (enabled.includes("partnerStore")) {
        Konva.Image.fromURL('images/1x/wires/E-5.svg', function (image) {
            image.setAttrs({
                x: 405,
                y: 265,
                width: 460,
                height: 190,
                opacity: 0,
                id: 'myCallCenterConnection1',
            });
            yourConnectionsLayer.add(image);
            image.zIndex(1);
            image.to({opacity: 1});
            yourConnectionsLayer.batchDraw();
        });        
    }
}
function myWebsiteConnections3() {
    Konva.Image.fromURL('images/1x/antenna_3.svg', function (image) {
        image.setAttrs({
            x: 370,
            y: 460,
            width: 42,
            height: 70,
            opacity: 0,
            id: 'myWebsiteAntenna',
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/wires/E-1.svg', function (image) {
        image.setAttrs({
            x: 360,
            y: 45,
            width: 139,
            height: 439,
            opacity: 0,
        });
        yourConnectionsLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/wires/E-2.svg', function (image) {
        image.setAttrs({
            x: 390,
            y: 95,
            width: 189,
            height: 383,
            opacity: 0,
        });
        yourConnectionsLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/wires/E-3.svg', function (image) {
        image.setAttrs({
            x: 405,
            y: 140,
            width: 257,
            height: 329,
            opacity: 0,
        });
        yourConnectionsLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function myWebsiteDSCO() {
    Konva.Image.fromURL('images/1x/dsco_solution/'+ selectedColor+'_solution_e.svg', function (image) {
        image.setAttrs({
            x: 375,
            y: 355,
            width: 11,
            height: 130,
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function rightRoute1() {
    Konva.Image.fromURL('images/1x/route_right1.png', function (image) {
        image.setAttrs({
            x: 472,
            y: 166,
            width: 125,
            height: 150,
            opacity: 0,
        });
        
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function rightRoute2() {
    Konva.Image.fromURL('images/1x/route_right2.png', function (image) {
        image.setAttrs({
            x: 390,
            y: 120,
            width: 156,
            height: 196,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function rightRoute3() {
    Konva.Image.fromURL('images/1x/route_right3.png', function (image) {
        image.setAttrs({
            x: 506,
            y: 210,
            width: 176,
            height: 103,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function rightRoute4() {
    Konva.Image.fromURL('images/1x/route_right4.png', function (image) {
        image.setAttrs({
            x: 500,
            y: 260,
            width: 257,
            height: 73,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function rightRoute5() {
    Konva.Image.fromURL('images/1x/route_right5.png', function (image) {
        image.setAttrs({
            x: 498,
            y: 289,
            width: 338,
            height: 92,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function leftRoute1() {
    Konva.Image.fromURL('images/1x/route_left1.png', function (image) {
        image.setAttrs({
            x: 340,
            y: 353,
            width: 125,
            height: 150,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function leftRoute2() {
    Konva.Image.fromURL('images/1x/route_left2.png', function (image) {
        image.setAttrs({
            x: 390,
            y: 353,
            width: 156,
            height: 196,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function leftRoute3() {
    Konva.Image.fromURL('images/1x/route_left3.png', function (image) {
        image.setAttrs({
            x: 257,
            y: 353,
            width: 177,
            height: 104,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function leftRoute4() {
    Konva.Image.fromURL('images/1x/route_left4.png', function (image) {
        image.setAttrs({
            x: 179,
            y: 336,
            width: 257,
            height: 73,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function leftRoute5() {
    Konva.Image.fromURL('images/1x/route_left6.png', function (image) {
        image.setAttrs({
            x: 100,
            y: 290,
            width: 338,
            height: 91,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function dsToStoreRoute() {
    Konva.Image.fromURL('images/1x/dropship_to_store_3.png', function (image) {
        image.setAttrs({
            x: 390,
            y: 120,
            width: 315,
            height: 430,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/dropship_to_store_2.png', function (image) {
        image.setAttrs({
            x: 420,
            y: 166,
            width: 285,
            height: 383,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/dropship_to_store_1.png', function (image) {
        image.setAttrs({
            x: 420,
            y: 212,
            width: 284,
            height: 337,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function dsFromStoreRoute() {
    Konva.Image.fromURL('images/1x/multiple-store-routes.png', function (image) {
        image.setAttrs({
            x: 420,
            y: 355,
            width: 272,
            height: 196,
            opacity: 0,
        });
        routesLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        routesLayer.batchDraw();
    });
}
function showAll(){
    selectedColor = "blue";
    partnerStore();
    // partnerStoreAntennae();
    myFactory(selectedColor);
    // myFactoryAntennae();
    // myFactoryConnections();
    myWarehouse(selectedColor);
    // myWarehouseAntennae();
    // myWarehouseConnections();
    my3pl(selectedColor);
    // my3plAntennae();
    // my3plConnections();
    myCallCenter(selectedColor);
    // myCallCenterAntennae();
    // myCallCenterConnections();
    myWebsite(selectedColor);
    // myWebsiteAntenna();
    // myWebsiteConnections();
    partner3pl();
    partner3plInventory();
    // partner3plAntennae();
    partnerFactory();
    partnerFactoryInventory();
    // partnerFactoryAntennae();
    partnerWarehouse();
    partnerWarehouseInventory();
    // partnerWarehouseAntennae();
    partnerWebsite();
    // partnerWebsiteAntennae();
    myStore1(selectedColor);
    // myStore1Connections3();
    // myStore1Connections();
    // myStore1Antennae();
    // myStore1Inventory(selectedColor);
    myStore2(selectedColor);
    myStore2Inventory(selectedColor);
    myStore3(selectedColor);
    myStore3Inventory(selectedColor);
    myStore4(selectedColor);
    myStore4Inventory(selectedColor);
    // pathBopis();
    // dsFromStoreRoute();
    // rightRoute1();
    // rightRoute2();
    // rightRoute3();
    // rightRoute4();
    rightRoute5();
    // leftRoute1();
    // leftRoute2();
    // leftRoute3();
    // leftRoute4();
    // leftRoute5();
    // dsToStoreRoute();
    // smallParcel();
    // smallParcelDSFS();
    // lTL();
    // courier();
    // whiteGlove();
    // multipleDeliveryMethods();
    // multipleDeliveryMethodsDFS();
    // whiteGloveDSFS();
    // dscoSolution('dsfromstore');
    // partnerFactoryDSCO();
    // partnerWarehouseDSCO();
    // partner3plDSCO();
    // yourConnections('dsfromstore');
    // myWebsiteConnections3();
    // dscoSolution('build');
}   

function createDropshipSelectorMenu(items) {
    var menuHtml = '<h6>DROPSHIP</h6>'
    + '<h5>What delivery options do your drop ship partners offer?</h5>'
    + '<p>Select all that apply:</p>'
    + '<ul>';
    for (i = 0; i < items.length; i++) {
        menuHtml += '<li data-option="'+ items[i].option+'" data-selected="false">'
        + '<div class="img"><img src="'+items[i].image+'" data-orig="'+items[i].image+'"><i class="selected-icon"></i></div>'
        + '<div>'+items[i].title+'</li>';
    }
    menuHtml += '</ul>'
    + '<div class="actions">'
    + '<a href="#" class="btn prev step2">« BACK</a>'
    + '<a href="#" class="btn next step4">NEXT »</a>'
    + '</div>';
     // console.log(menuHtml);
    $('#menu2').fadeOut(function(){
        $('#menu3').append(menuHtml);
        $('#menu3').fadeIn(function(){
            $('#menu3 li').bind("click", function(){
                 // console.log($(this).data('option'));
                var selected = $(this).hasClass('active');
                if (selected) {
                    $(this).removeClass('active');
                    $(this).find('.selected-icon').removeClass('active');
                    deliveryOptionSelectedReview();
                } else {
                    $(this).addClass('active');
                    $(this).find('.selected-icon').addClass('active');
                    rightRoute1();
                    rightRoute2();
                    rightRoute3();
                    deliveryOptionSelected($(this).data('option'));
                }
            });
            $('#menu3 a.step2').bind("click", function(){
                layer.clear();
                deliveryOptionLayer.clear();
                yourConnectionsLayer.clear();
                inventoryLayer.clear();
                routesLayer.clear();
                dscoLayer.clear();
                $('#menu3').fadeOut(function(){
                    $('#menu3').html('');
                    $('#menu2').fadeIn();
                });
            });
            $('#menu3 a.step4').bind("click", function(){
                menu4('DROP SHIP','GREAT JOB!','<p>It’s beautiful! Click through the tabs to see how you can use Dsco’s solution to simplify all the connections in your ecosystem.</p><p>Let’s make your solution a reality! A concerted effort by your team can get many of your inventory locations up and running in a matter of days, and Dsco is ready to help you make that happen.</p>','#menu3');
                showForm('DROP SHIP with DSCO', 'Drop ship winners clear away barriers to partnership at scale, allowing them to remove bugs in the consumer experience and reinvent their financial models. Strong partnerships turn drop ship challenges into opportunities.','Download this cool thing about Drop Shipping with Dsco');
            });
        });
    });
}
function createDsToStoreSelectorMenu(items) {
    var menuHtml = '<h6>DROP SHIP TO STORE</h6>'
    + '<h5>What Delivery Options do your Partners use?</h5>'
    + '<p>Select all that apply:</p>'
    + '<ul>';
    for (i = 0; i < items.length; i++) {
        menuHtml += '<li data-option="'+ items[i].option+'" data-selected="false">'
        + '<div class="img"><img src="'+items[i].image+'" data-orig="'+items[i].image+'"><i class="selected-icon"></i></div>'
        + '<div>'+items[i].title+'</li>';
    }
    menuHtml += '</ul>'
    + '<div class="actions">'
    + '<a href="#" class="btn prev step2">« BACK</a>'
    + '<a href="#" class="btn next step4">NEXT »</a>'
    + '</div>';
     // console.log(menuHtml);
    $('#menu2').fadeOut(function(){
        $('#menu3').append(menuHtml);
        $('#menu3').fadeIn(function(){
            $("#menu3 li .img-hover").hover(function() {
                $(this).children('img').attr("src",$(this).children('img').data('hover'));
            }, function() {
                $(this).children('img').attr("src",$(this).children('img').data('orig'));
            });
            $('#menu3 li').bind("click", function(){
                var selected = $(this).hasClass('active');
                if (selected) {
                    $(this).removeClass('active');
                    $(this).find('.selected-icon').removeClass('active');
                    deliveryOptionSelectedReview();
                } else {
                    $(this).addClass('active');
                    $(this).find('.selected-icon').addClass('active');
                    dsToStoreRoute();
                    deliveryOptionSelected($(this).data('option'));
                }
            });
            $('#menu3 a.step2').bind("click", function(){
                layer.clear();
                deliveryOptionLayer.clear();
                yourConnectionsLayer.clear();
                inventoryLayer.clear();
                routesLayer.clear();
                dscoLayer.clear();
                $('#menu3').fadeOut(function(){
                    $('#menu3').html('');
                    $('#menu2').fadeIn();
                });
            });
            $('#menu3 a.step4').bind("click", function(){
                menu4('DROP SHIP TO STORE','GREAT JOB!','<p>It’s beautiful! Click through the tabs to see how you can use Dsco’s solution to simplify all the connections in your ecosystem.</p><p>Let’s make your solution a reality! A concerted effort by your team can get many of your inventory locations up and running in a matter of days, and Dsco is ready to help you make that happen.</p>','#menu3');
            });
        });
    });
}
function createDsFromStoreSelectorMenu(items) {
    var menuHtml = '<h6>SHIP FROM STORE</h6>'
    + '<h5>What methods do you use to ship from your stores?</h5>'
    + '<p>Select all that apply:</p>'
    + '<ul>';
    for (i = 0; i < items.length; i++) {
        menuHtml += '<li data-option="'+ items[i].option+'" data-selected="false">'
        + '<div class="img"><img src="'+items[i].image+'" data-orig="'+items[i].image+'"><i class="selected-icon"></i></div>'
        + '<div>'+items[i].title+'</li>';
    }
    menuHtml += '</ul>'
    + '<div class="actions">'
    + '<a href="#" class="btn prev step2">« BACK</a>'
    + '<a href="#" class="btn next step4">NEXT »</a>'
    + '</div>';
     // console.log(menuHtml);
    $('#menu2').fadeOut(function(){
        $('#menu3').append(menuHtml);
        $('#menu3').fadeIn(function(){
            $('#menu3 li').bind("click", function(){
                var selected = $(this).hasClass('active');
                if (selected) {
                    $(this).removeClass('active');
                    $(this).find('.selected-icon').removeClass('active');
                    deliveryDsFromStoreOptionSelectedReview();
                } else {
                    $(this).addClass('active');
                    $(this).find('.selected-icon').addClass('active');
                    dsFromStoreRoute();
                    deliveryDsFromStoreOptionSelected($(this).data('option'));
                }
            });
            $('#menu3 a.step2').bind("click", function(){
                layer.clear();
                deliveryOptionLayer.clear();
                yourConnectionsLayer.clear();
                inventoryLayer.clear();
                routesLayer.clear();
                dscoLayer.clear();
                $('#menu3').fadeOut(function(){
                    $('#menu3').html('');
                    $('#menu2').fadeIn();
                });
            });
            $('#menu3 a.step4').bind("click", function(){
                menu4('SHIP FROM STORE','GREAT JOB!','<p>It’s beautiful! Click through the tabs to see how you can use Dsco’s solution to simplify all the connections in your ecosystem.</p><p>Let’s make your solution a reality! A concerted effort by your team can get many of your inventory locations up and running in a matter of days, and Dsco is ready to help you make that happen.</p>','#menu3');
            });
        });
    });
}
function createBuilderSelectorMenu(items) {
    var menuHtml = '<h6>SHIP FROM STORE</h6>'
    + '<h5>What methods do you use to ship from your stores?</h5>'
    + '<p>Select all that apply:</p>'
    + '<ul>';
    for (i = 0; i < items.length; i++) {
        menuHtml += '<li data-option="'+ items[i].option+'" data-selected="false">'
        + '<div class="img"><img src="'+items[i].image+'" data-orig="'+items[i].image+'"><i class="selected-icon"></i></div>'
        + '<div>'+items[i].title+'</li>';
    }
    menuHtml += '</ul>'
    + '<div class="actions">'
    + '<a href="#" class="btn prev step2">« BACK</a>'
    + '<a href="#" class="btn next step4">NEXT »</a>'
    + '</div>';
     // console.log(menuHtml);
    $('#menu2').fadeOut(function(){
        $('#menu3').append(menuHtml);
        $('#menu3').fadeIn(function(){
            $('#menu3 li').bind("click", function(){
                var selected = $(this).hasClass('active');
                if (selected) {
                    $(this).removeClass('active');
                    $(this).find('.selected-icon').removeClass('active');
                    deliveryDsFromStoreOptionSelectedReview();
                } else {
                    $(this).addClass('active');
                    $(this).find('.selected-icon').addClass('active');
                    dsFromStoreRoute();
                    deliveryDsFromStoreOptionSelected($(this).data('option'));
                }
            });
            $('#menu3 a.step2').bind("click", function(){
                layer.clear();
                deliveryOptionLayer.clear();
                yourConnectionsLayer.clear();
                inventoryLayer.clear();
                routesLayer.clear();
                dscoLayer.clear();
                $('#menu3').fadeOut(function(){
                    $('#menu3').html('');
                    $('#menu2').fadeIn();
                });
            });
            $('#menu3 a.step4').bind("click", function(){
                menu4('SHIP FROM STORE','GREAT JOB!','<p>It’s beautiful! Click through the tabs to see how you can use Dsco’s solution to simplify all the connections in your ecosystem.</p><p>Let’s make your solution a reality! A concerted effort by your team can get many of your inventory locations up and running in a matter of days, and Dsco is ready to help you make that happen.</p>','#menu3');
            });
        });
    });
}
function optionSelected(option) {
    switch(option) {
        case "dropship":
            chosenPath(option);    
            pathDropship();
            var text = new Konva.Text({
                x: 40,
                y: 105,
                text: 'DROP SHIP',
                fontSize: 12,
                fontFamily: "Open Sans",
                fill: '#2E3F51',
                align: 'center',
                lineHeight: 1.3,
            });
            layer.add(text);
            legend(selectedColor);
            break;
        case "dstostore":
            chosenPath(option);    
            pathDstostore();
            legend(selectedColor);
            var text = new Konva.Text({
                x: 50,
                y: 120,
                text: 'DROP SHIP TO STORE',
                fontSize: 12,
                fontFamily: "Open Sans",
                fill: '#2E3F51',
                align: 'center',
                lineHeight: 1.3,
            });
            layer.add(text);
            break;
        case "dsfromstore":
            chosenPath(option);
            pathDsfromstore();
            var text = new Konva.Text({
                x: 40,
                y: 120,
                text: 'SHIP FROM STORE',
                fontSize: 12,
                fontFamily: "Open Sans",
                fill: '#2E3F51',
                align: 'center',
                lineHeight: 1.3,
            });
            layer.add(text);
            legend(selectedColor);
            break;
        case "bopis":
            chosenPath(option);
            pathBopis();
            var text = new Konva.Text({
                x: 80,
                y: 130,
                text: 'BOPIS',
                fontSize: 12,
                fontFamily: "Open Sans",
                fill: '#2E3F51',
                align: 'center',
                lineHeight: 1.3,
            });
            layer.add(text);
            legend(selectedColor);
            break;
        case "build":
            chosenPath(option);
            pathBuild();
            var text = new Konva.Text({
                x: 40,
                y: 130,
                text: 'BUILD YOUR OWN',
                fontSize: 12,
                fontFamily: "Open Sans",
                fill: '#2E3F51',
                align: 'center',
                lineHeight: 1.3,
            });
            layer.add(text);
            legend(selectedColor);
            break;
    }
}
function deliveryOptionSelected(option) {
    deliveryOptionLayer.destroyChildren();
    deliveryOptionLayer.batchDraw();
     // console.log('OPTION SELECTED', option);
    if (selectedDeliveryMethod != '') {
        multipleDeliveryMethods();
    } else {
        switch (option) {
            case "not_sure":
                selectedDeliveryMethod = option;
                smallParcel();
                break;
            case "small_parcel":
                selectedDeliveryMethod = option;
                smallParcel();
                break;
            case "ltl":
                selectedDeliveryMethod = option;
                lTL();
                break;
            case "courier":
                selectedDeliveryMethod = option;
                courier();
                break;
            case "white_glove":
                selectedDeliveryMethod = option;
                whiteGlove();
                break;
        }
    }
}
function deliveryDsFromStoreOptionSelected(option) {
    deliveryOptionLayer.destroyChildren();
    if (selectedDeliveryMethod != '') {
        multipleDeliveryMethodsDSFS();
    } else {
        switch (option) {
            case "not_sure":
                selectedDeliveryMethod = option;
                smallParcelDSFS();
                break;
            case "small_parcel":
                selectedDeliveryMethod = option;
                smallParcelDSFS();
                break;
            case "ltl":
                selectedDeliveryMethod = option;
                lTLDSFS();
                break;
            case "courier":
                selectedDeliveryMethod = option;
                courierDSFS();
                break;
            case "white_glove":
                selectedDeliveryMethod = option;
                whiteGloveDSFS();
                break;
        }
    }
}

function deliveryOptionSelectedReview() {
    var count = 0;
    var option = '';
    $('#menu3 li.active').each(function(index, value) {
        count++;
        option = $(this).data('option');
    });
    if (count==1) {
        selectedDeliveryMethod = [];
        deliveryOptionSelected(option);
    }
    if (count==0) {
        selectedDeliveryMethod = [];
        deliveryOptionLayer.destroyChildren();
        deliveryOptionLayer.batchDraw();
    }
}
function deliveryDsFromStoreOptionSelectedReview() {
    var count = 0;
    var option = '';
    $('#menu3 li.active').each(function(index, value) {
        count++;
        option = $(this).data('option');
    });
    if (count==1) {
        selectedDeliveryMethod = [];
        deliveryDsFromStoreOptionSelected(option);
    }
    if (count==0) {
        selectedDeliveryMethod = [];
        deliveryOptionLayer.destroyChildren();
        deliveryOptionLayer.batchDraw();
    }
}

function multipleDeliveryMethods() {
    Konva.Image.fromURL('images/1x/multiple_shipping.svg', function (image) {
        image.setAttrs({
            x: 420,
            y: 125,
            width: 48,
            height: 55,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/multiple_shipping.svg', function (image) {
        image.setAttrs({
            x: 500,
            y: 173,
            width: 48,
            height: 55,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/multiple_shipping.svg', function (image) {
        image.setAttrs({
            x: 580,
            y: 219,
            width: 48,
            height: 55,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}
function multipleDeliveryMethodsDSFS() {
    Konva.Image.fromURL('images/1x/multiple_shipping.svg', function (image) {
        image.setAttrs({
            x: 490,
            y: 450,
            width: 48,
            height: 55,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/multiple_shipping.svg', function (image) {
        image.setAttrs({
            x: 565,
            y: 410,
            width: 48,
            height: 55,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/multiple_shipping.svg', function (image) {
        image.setAttrs({
            x: 640,
            y: 365,
            width: 48,
            height: 55,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}
function smallParcel() {
    Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
        image.setAttrs({
            x: 425,
            y: 137,
            width: 40,
            height: 36,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
        image.setAttrs({
            x: 505,
            y: 185,
            width: 40,
            height: 36,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
        image.setAttrs({
            x: 585,
            y: 230,
            width: 40,
            height: 36,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}

function lTL() {
    Konva.Image.fromURL('images/1x/ltl_left.svg', function (image) {
        image.setAttrs({
            x: 410,
            y: 130,
            width: 60,
            height: 52,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/ltl_left.svg', function (image) {
        image.setAttrs({
            x: 490,
            y: 176,
            width: 60,
            height: 52,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/ltl_left.svg', function (image) {
        image.setAttrs({
            x: 575,
            y: 220,
            width: 60,
            height: 52,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}

function courier() {
    Konva.Image.fromURL('images/1x/courier_left.svg', function (image) {
        image.setAttrs({
            x: 430,
            y: 142,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/courier_left.svg', function (image) {
        image.setAttrs({
            x: 510,
            y: 186,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/courier_left.svg', function (image) {
        image.setAttrs({
            x: 590,
            y: 235,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}
function whiteGlove() {
    Konva.Image.fromURL('images/1x/whiteglove.svg', function (image) {
        image.setAttrs({
            x: 430,
            y: 142,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/whiteglove.svg', function (image) {
        image.setAttrs({
            x: 510,
            y: 186,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/whiteglove.svg', function (image) {
        image.setAttrs({
            x: 590,
            y: 235,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}
function smallParcelDSFS() {
    Konva.Image.fromURL('images/1x/smallparcel_right.svg', function (image) {
        image.setAttrs({
            x: 495,
            y: 475,
            width: 40,
            height: 36,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/smallparcel_right.svg', function (image) {
        image.setAttrs({
            x: 570,
            y: 425,
            width: 40,
            height: 36,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
        image.setAttrs({
            x: 645,
            y: 380,
            width: 40,
            height: 36,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}

function lTLDSFS() {
    Konva.Image.fromURL('images/1x/ltl_right.svg', function (image) {
        image.setAttrs({
            x: 475,
            y: 465,
            width: 60,
            height: 52,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/ltl_right.svg', function (image) {
        image.setAttrs({
            x: 550,
            y: 420,
            width: 60,
            height: 52,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/ltl_left.svg', function (image) {
        image.setAttrs({
            x: 630,
            y: 370,
            width: 60,
            height: 52,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}

function courierDSFS() {
    Konva.Image.fromURL('images/1x/courier_right.svg', function (image) {
        image.setAttrs({
            x: 485,
            y: 485,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/courier_right.svg', function (image) {
        image.setAttrs({
            x: 570,
            y: 435,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/courier_left.svg', function (image) {
        image.setAttrs({
            x: 650,
            y: 390,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}
function whiteGloveDSFS() {
    Konva.Image.fromURL('images/1x/whiteglove.svg', function (image) {
        image.setAttrs({
            x: 485,
            y: 485,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/whiteglove.svg', function (image) {
        image.setAttrs({
            x: 570,
            y: 435,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    Konva.Image.fromURL('images/1x/whiteglove.svg', function (image) {
        image.setAttrs({
            x: 650,
            y: 390,
            width: 29,
            height: 27,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(8);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
}
function pathDropship() {
    partner3pl();
    partner3plInventory();
    partnerFactory(selectedColor);
    partnerFactoryInventoryPartner();
    partnerWarehouse(selectedColor);
    partnerWarehouseInventoryPartner();
    myWebsite(selectedColor);
   
    createDropshipSelectorMenu(dropShipMenuItems);
}

function pathDstostore() {
    partner3pl();
    partner3plInventory();
    partnerFactory(selectedColor);
    partnerFactoryInventoryPartner();
    partnerWarehouse(selectedColor);
    partnerWarehouseInventoryPartner();
    myStore1(selectedColor);
    createDsToStoreSelectorMenu(dropShipMenuItems);
}
function pathDsfromstore() {
    myStore1(selectedColor);
    myStore1Inventory(selectedColor);
    myStore2(selectedColor);
    myStore2Inventory(selectedColor);
    myStore3(selectedColor);
    myStore3Inventory(selectedColor);
    myStore4(selectedColor);
    myStore4Inventory(selectedColor);
    myWebsite(selectedColor);
    createDsFromStoreSelectorMenu(dropShipMenuItems);
}
function pathBopis() {
    myStore1(selectedColor);
    myStore1Inventory(selectedColor);
    myStore2(selectedColor);
    myStore2Inventory(selectedColor);
    myStore3(selectedColor);
    myStore3Inventory(selectedColor);
    myStore4(selectedColor);
    myStore4Inventory(selectedColor);
    myWebsite(selectedColor);
    Konva.Image.fromURL('images/1x/bopis_left.png', function (image) {
        image.setAttrs({
            x: 390,
            y: 352,
            width: 156,
            height: 171,
            opacity: 0,
        });
        deliveryOptionLayer.add(image);
        image.zIndex(2);
        image.to({opacity: 1});
        deliveryOptionLayer.batchDraw();
    });
    menu4('BOPIS','GREAT JOB!','<p>It’s beautiful! Click through the tabs to see how you can use Dsco’s solution to simplify all the connections in your ecosystem.</p><p>Let’s make your solution a reality! A concerted effort by your team can get many of your inventory locations up and running in a matter of days, and Dsco is ready to help you make that happen.</p>','#menu2');
}
function pathBuild() {
    builderMenu2(); 
}
function menu4(section, title, message, prevMenu, showBYO=true) {
    var menuHtml = '<h6>' + section + '</h6>'
    + '<h5>' + title + '</h5>'
    + message
    + '<div class="centered">'
    + '<a class="btn">LET\'S CHAT</a><br><br>'
    + '<a class="start-over">START OVER</a>'
    + '</div>';
    if (showBYO)
        menuHtml += '<p>You can also further customize your build by clicking below.</p>';

    $(prevMenu).fadeOut(function(){
        $('#menu4').append(menuHtml);
        $('#menu4').fadeIn(function(){});
        $('.start-over').bind( "click", function(e) {
            startOver();
        });
    });
    
}
function startOver(){
    location.reload();
}
function showForm(title, paragraph, form_title){
    var html = '<h3>' + title + '</h3>'
    + '<p>' + paragraph + '</p>'
    + '<LEAD FORM>';

    $('#builder-frm').append().fadeIn();

}
function legend(selectedColor){
    Konva.Image.fromURL('images/1x/inventory_' + selectedColor + '.svg', function (image) {
        image.setAttrs({
            x: 740,
            y: 520,
            width: 34,
            height: 35,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
    var text_owned = new Konva.Text({
        x: 785,
        y: 531,
        text: 'OWNED INVENTORY',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    inventoryLayer.add(text_owned);

    Konva.Image.fromURL('images/1x/partner_inventory.svg', function (image) {
        image.setAttrs({
            x: 740,
            y: 570,
            width: 34,
            height: 35,
            opacity: 0,
        });
        inventoryLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        inventoryLayer.batchDraw();
    });
    var text_partner = new Konva.Text({
        x: 785,
        y: 581,
        text: 'PARTNER INVENTORY',
        fontSize: 12,
        fontFamily: "Open Sans",
        fill: '#2E3F51',
        align: 'center',
        lineHeight: 1.3,
    });
    inventoryLayer.add(text_partner);
}

function  yourEcosystem(option) {
    yourConnectionsLayer.visible(false);
    dscoLayer.visible(false);
    var images = layer.find('Image');
    for (i=0; i < images.length; i++) {
        if (images[i].id()!='myWebsite') {
            images[i].opacity(1);
        }
    }
    layer.draw();
    legend();
}
function yourConnectionsImage() {
    Konva.Image.fromURL('images/1x/bg-your_connections.svg', function (image) {
        image.setAttrs({
            x: 0,
            y: 0,
            width: 953,
            height: 553,
            opacity: 0,
            id: 'yourConnections'
        });
        yourConnectionsLayer.add(image);
        image.zIndex(1);
        image.to({opacity: 1});
        yourConnectionsLayer.batchDraw();
    });
}
function yourConnections(option) {
    dscoLayer.visible(false);
    var images = layer.find('Image');
    var yourConnectionsImages = yourConnectionsLayer.find('#yourConnections')
    yourConnectionsLayer.visible(true);
    switch(option) {
        case "dropship":
            for (i=0; i < images.length; i++) {
                if (images[i].id()!='myWebsite' && images[i].id()!='chosenPath') {
                    images[i].opacity(0.5);
                }
            }
            layer.draw();
            if (yourConnectionsImages.length==0) {
                yourConnectionsImage();
                myWebsiteConnections3();
                Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
                    image.setAttrs({
                        x: 452,
                        y: 41,
                        width: 50,
                        height: 70,
                        opacity: 0,
                        id: 'myWebsiteAntenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
                    image.setAttrs({
                        x: 535,
                        y: 90,
                        width: 50,
                        height: 70,
                        opacity: 0,
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
                    image.setAttrs({
                        x: 620,
                        y: 135,
                        width: 50,
                        height: 70,
                        opacity: 0,
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
            }
            
            break;
        case "dstostore":
            if (yourConnectionsImages.length==0) {
                yourConnectionsImage();
                myStore1Connections3();
                Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
                    image.setAttrs({
                        x: 452,
                        y: 41,
                        width: 50,
                        height: 70,
                        opacity: 0,
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
                    image.setAttrs({
                        x: 535,
                        y: 90,
                        width: 50,
                        height: 70,
                        opacity: 0,
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_5.svg', function (image) {
                    image.setAttrs({
                        x: 620,
                        y: 135,
                        width: 50,
                        height: 70,
                        opacity: 0,
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                
            }
            break;
        case "dsfromstore":
            if (yourConnectionsImages.length==0) {
                yourConnectionsImage();
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 380,
                        y: 430,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myWebsiteAntenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 455,
                        y: 475,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore1Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 520,
                        y: 430,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore2Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 600,
                        y: 385,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore3Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 685 ,
                        y: 345,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore4Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_1.svg', function (image) {
                    image.setAttrs({
                        x: 383,
                        y: 449,
                        width: 82,
                        height: 48,
                        opacity: 0,
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 474,
                        y: 448,
                        width: 54,
                        height: 41,
                        opacity: 0,
                        id: "store1Connection2"
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 490,
                        y: 403,
                        width: 121,
                        height: 80,
                        opacity: 0,
                        id: "store1Connection3"
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 482,
                        y: 361,
                        width: 236,
                        height: 138,
                        opacity: 0,
                        id: "store1Connection4",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_3.svg', function (image) {
                    image.setAttrs({
                        x: 400,
                        y: 433,
                        width: 143,
                        height: 15,
                        opacity: 0,
                        id: "websiteConnection2",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_7.svg', function (image) {
                    image.setAttrs({
                        x: 413,
                        y: 388,
                        width: 223,
                        height: 46,
                        opacity: 0,
                        id: "websiteConnection3",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_7.svg', function (image) {
                    image.setAttrs({
                        x: 408,
                        y: 358,
                        width: 299,
                        height: 96,
                        opacity: 0,
                        id: "websiteConnection4",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 555,
                        y: 404,
                        width: 75,
                        height: 34,
                        opacity: 0,
                        id: "store2Connection3",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 630,
                        y: 345,
                        width: 89,
                        height: 55,
                        opacity: 0,
                        id: "store3Connection2",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
            }
            break;
        case "bopis":
            if (yourConnectionsImages.length==0) {
                yourConnectionsImage();
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 380,
                        y: 430,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myWebsiteAntenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 455,
                        y: 475,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore1Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 520,
                        y: 430,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore2Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 600,
                        y: 385,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore3Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/antenna_4.svg', function (image) {
                    image.setAttrs({
                        x: 685 ,
                        y: 345,
                        width: 42,
                        height: 70,
                        opacity: 0,
                        id: 'myStore4Antenna',
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_1.svg', function (image) {
                    image.setAttrs({
                        x: 383,
                        y: 449,
                        width: 82,
                        height: 48,
                        opacity: 0,
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 474,
                        y: 448,
                        width: 54,
                        height: 41,
                        opacity: 0,
                        id: "store1Connection2"
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 490,
                        y: 403,
                        width: 121,
                        height: 80,
                        opacity: 0,
                        id: "store1Connection3"
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 482,
                        y: 361,
                        width: 236,
                        height: 138,
                        opacity: 0,
                        id: "store1Connection4",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_3.svg', function (image) {
                    image.setAttrs({
                        x: 400,
                        y: 433,
                        width: 143,
                        height: 15,
                        opacity: 0,
                        id: "websiteConnection2",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_7.svg', function (image) {
                    image.setAttrs({
                        x: 413,
                        y: 388,
                        width: 223,
                        height: 46,
                        opacity: 0,
                        id: "websiteConnection3",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_7.svg', function (image) {
                    image.setAttrs({
                        x: 408,
                        y: 358,
                        width: 299,
                        height: 96,
                        opacity: 0,
                        id: "websiteConnection4",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 555,
                        y: 404,
                        width: 75,
                        height: 34,
                        opacity: 0,
                        id: "store2Connection3",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
                Konva.Image.fromURL('images/1x/wires/stores_4.svg', function (image) {
                    image.setAttrs({
                        x: 630,
                        y: 345,
                        width: 89,
                        height: 55,
                        opacity: 0,
                        id: "store3Connection2",
                    });
                    yourConnectionsLayer.add(image);
                    image.zIndex(1);
                    image.to({opacity: 1});
                    yourConnectionsLayer.batchDraw();
                });
            }
            break;
        case "build":
            if (yourConnectionsImages.length==0) {
                yourConnectionsImage();
                if (enabledInventory.includes("myCallCenter")) {
                    myCallCenterConnections();
                }
                if (enabledInventory.includes("myWebsite")) {
                    myWebsiteConnections();
                }
                if (enabled.includes("myStore1")) {
                    myStore1Connections();
                }
                if (enabled.includes("my3pl")) {
                    my3plConnections();
                }
                if (enabled.includes("myWarehouse")) {
                    myWarehouseConnections();
                }
                if (enabled.includes("myFactory")) {
                    myFactoryConnections();
                }
                if (enabled.includes("partnerWarehouse")) {
                    partnerWarehouseAntennae();
                }
                if (enabled.includes("partnerFactory")) {
                    partnerFactoryAntennae();
                }
                if (enabledInventory.includes("partnerWebsite")) {
                    partnerWebsiteAntennae();
                }
                if (enabled.includes("partnerStore")) {
                    partnerStoreAntennae();
                }
            }
            break;
                       
    }
}
function dscoSolutionImage() {
    Konva.Image.fromURL('images/1x/dsco_center.svg', function (image) {
        image.setAttrs({
            x: 310,
            y: 200,
            width: 318,
            height: 234,
            id: 'dscoSolution'
        });
        dscoLayer.add(image);
        image.zIndex(0);
        dscoLayer.batchDraw();
    });
}
function dscoSolution(option) {
     // console.log('Show DSCO');
    dscoLayer.visible(true);
    yourConnectionsLayer.visible(false);
    var dscoImages = dscoLayer.find('#dscoSolution');
    var images = layer.find('Image');
    switch(option) {
        case "dropship":
            if (dscoImages.length==0) {
                myWebsiteDSCO();
                partnerFactoryDSCO();
                partnerWarehouseDSCO();
                partner3plDSCO();
                dscoSolutionImage();
            }
            for (i=0; i < images.length; i++) {
                if (images[i].id()!='myWebsite' && images[i].id()!='chosenPath') {
                    images[i].opacity(0.5);
                }
            }
            layer.draw();
            break;
        case "dstostore":
            if (dscoImages.length==0) {
                myStore1DSCO();
                partnerFactoryDSCO();
                partnerWarehouseDSCO();
                partner3plDSCO();
                dscoSolutionImage();
            }

            for (i=0; i < images.length; i++) {
                if (images[i].id()!='myStore1' && images[i].id()!='chosenPath') {
                    images[i].opacity(0.5);
                }
            }
            layer.draw();    
            break;
        case "dsfromstore":
            if (dscoImages.length==0) {
                myStore1DSCO();
                myStore2DSCO();
                myStore3DSCO();
                myStore4DSCO();
                dscoSolutionImage();
                Konva.Image.fromURL('images/1x/wires/store_solution_1.svg', function (image) {
                    image.setAttrs({
                        x: 375,
                        y: 355,
                        width: 12,
                        height: 130,
                    });
                    dscoLayer.add(image);
                    image.zIndex(0);
                    dscoLayer.batchDraw();
                });
            }
            break;
        case "bopis":
            if (dscoImages.length==0) {
                myStore1DSCO();
                myStore2DSCO();
                myStore3DSCO();
                myStore4DSCO();
                dscoSolutionImage();
                Konva.Image.fromURL('images/1x/wires/store_solution_1.svg', function (image) {
                    image.setAttrs({
                        x: 375,
                        y: 355,
                        width: 12,
                        height: 130,
                    });
                    dscoLayer.add(image);
                    image.zIndex(0);
                    dscoLayer.batchDraw();
                });
            }
            break;
        case "build":
            if (dscoImages.length==0) {
                if (enabledInventory.includes("myCallCenter")) {
                    myCallCenterDSCO();
                }
                if (enabledInventory.includes("myWebsite")) {
                    myWebsiteDSCO();
                }
                if (enabled.includes("myStore1")) {
                    myStore1DSCOColor();
                }
                if (enabled.includes("my3pl")) {
                    my3plDSCO();
                }
                if (enabled.includes("myWarehouse")) {
                    myWarehouseDSCO();
                }
                if (enabled.includes("myFactory")) {
                    myFactoryDSCO();
                }
                if (enabled.includes("partnerWarehouse")) {
                    partnerWarehouseDSCO();
                }
                if (enabled.includes("partnerFactory")) {
                    partnerFactoryDSCO();
                }
                if (enabledInventory.includes("partnerWebsite")) {
                    partnerWebsiteDSCO();
                }
                if (enabled.includes("partner3PL")) {
                    partner3plDSCO();
                }
                if (enabled.includes("partnerStore")) {
                    partnerStoreDSCO();
                }
                dscoSolutionImage();
            }
            for (i=0; i < images.length; i++) {
                if (images[i].id()!='myStore1' && images[i].id()!='chosenPath') {
                    images[i].opacity(0.5);
                }
            }
            layer.draw();
            break;
                    
    }
}
function resetBoard() {
    yourConnectionsLayer();
}
$(function() {
    // showAll();
    // legend('orange'); 
    $(".img-hover").hover(function() {
        $(this).children('img').attr("src",$(this).children('img').data('hover'));
    }, function() {
        $(this).children('img').attr("src",$(this).children('img').data('orig'));
    });
    $('.color-select').bind( "click", function(e) {
        e.preventDefault();
        selectedColor = $(this).data('color');
        $('#menu1').fadeOut(function() {
            var items = [
            {
                    "option":"dropship",
                    "image":"images/1x/dropship_solution.png",
                    "title":"DROP SHIP",
                    "text":"Expand online assortment with supply partner inventory"
                },
                {
                    "option":"dstostore",
                    "image":"images/1x/dstostore_" + selectedColor + ".png",
                    "title":"DROP SHIP TO STORE",
                    "text":"Expand BOPIS assortment with supply partner inventory"
                },
                {
                    "option":"dsfromstore",
                    "image":"images/1x/dsfromstore_" + selectedColor + ".png",
                    "title":"Ship from store",
                    "text":"Turn retail stores into ecommerce fulfillment centers"
                },
                {
                    "option":"bopis",
                    "image":"images/1x/bopis_" + selectedColor + ".png",
                    "title":"Bopis",
                    "text":"Turn retail stores into ecommerce pickup centers"
                },
                {
                    "option":"build",
                    "image":"images/1x/gears.png",
                    "title":"Build your own",
                    "text":"Do you have a visionary idea? Use Dsco to make it a reality."
                }
            ]
            var menuHtml = '<ul>';
            for (i = 0; i < items.length; i++) {
                menuHtml += '<li data-option="'+ items[i].option+'">'
                + '<div class="img"><div class="img_wrapper"><img src="'+items[i].image+'"><i class="selected-icon"></i></div></div>'
                + '<div class="content"><h5>'+items[i].title+'</h5>'
                + items[i].text+'</div></li>';
            }
            menuHtml += '</ul>';

            $('#menu2').append(menuHtml).fadeIn(function(){
                $('#menu2 li').bind("click", function(){
                     // console.log($(this).data('option'));
                    selectedMethod = $(this).data('option');
                    optionSelected($(this).data('option'));
                });
            });
        });    
    });
    $('#builder-tabs a').bind( "click", function(e) {
        e.preventDefault();
        var selected_choice = $(this).data('choice');
         // console.log('SELECTED CHOICE: ',selected_choice);
        if (selected_choice=='') {
            alert('Please select a solution first.');
        } else {
            $('#builder-tabs a').removeClass('selected');
            $(this).addClass('selected');
            if (selected_choice=='your_ecosystem') {
                 yourEcosystem(selectedMethod);
            }
            if (selected_choice=='your_connections') {
                yourConnections(selectedMethod);
            }
            if (selected_choice=='dsco') {
                dscoSolution(selectedMethod);
            }
        }
    }); 
});


// CUSTOM BUILDER
function builderMenu2() {
    selectedMethod = 'build';
    $('#menu2').fadeOut(function(){
        var items = [
            {
                "option":"myStore1",
                "image":"images/1x/store_" + selectedColor + ".svg",
                "title":"MY STORES",
                "text":"Expand online assortment with supply partner inventory",
                "width":"102px",
                "height":"91px;"
            },
            {
                "option":"myWarehouse",
                "image":"images/1x/warehouse_" + selectedColor + ".svg",
                "title":"MY WAREHOUSES",
                "text":"Expand BOPIS assortment with supply partner inventory",
                "width":"92px",
                "height":"91px;"
            },
            {
                "option":"my3pl",
                "image":"images/1x/3pl_" + selectedColor + ".svg",
                "title":"MY 3PL",
                "text":"Turn retail stores into ecommerce pickup centers",
                "width":"104px",
                "height":"89px;"
            },
            {
                "option":"myFactory",
                "image":"images/1x/factory_" + selectedColor + ".svg",
                "title":"MY FACTORIES",
                "text":"Turn your retail stores into BOPIS pick up centers today.",
                "width":"92px",
                "height":"118px;"
            },
            {
                "option":"partnerStore",
                "image":"images/1x/partner_store.svg",
                "title":"PARTNER STORES",
                "text":"Distributed Order Management (DOM) is a method used to optimize fulfillment so orders arrive to customers on time",
                "width":"103px",
                "height":"91px;"
            },
            {
                "option":"partnerWarehouse",
                "image":"images/1x/partner_warehouse.svg",
                "title":"PARTNER WAREHOUSES",
                "text":"Dsco can solve just about any supply chain ecosystem that you can throw at us.",
                "width":"92px",
                "height":"118px;"
            },
            {
                "option":"partnerFactory",
                "image":"images/1x/partner_factory.svg",
                "title":"PARTNER FACTORIES",
                "text":"Dsco can solve just about any supply chain ecosystem that you can throw at us.",
                "width":"92px",
                "height":"118px;"
            }
        ]
        
        var menuHtml = '<h5>Where is the inventory located?</h5>'
        + '<p>Select all that apply:</p>'
        + '<ul>';
        for (i = 0; i < items.length; i++) {
            menuHtml += '<li data-option="'+ items[i].option+'">'
            + '<div class="img"><div class="img_wrapper"><img src="'+items[i].image+'" height="'+ items[i].height +'" width="'+ items[i].width +'"><i class="selected-icon"></i></div></div>'
            + '<div class="content"><h5>'+items[i].title+'</h5>'
            + items[i].text+'</div></li>';
        }
        menuHtml += '</ul>'
        + '<div class="actions">'
        + '<a href="#" class="btn prev step2">« BACK</a>'
        + '<a href="#" class="btn next step4">NEXT »</a>'
        + '</div>';

        $('#customMenu2').append(menuHtml).fadeIn(function(){
            $('#customMenu2 li').bind("click", function(){
                if ($(this).find('.selected-icon').hasClass('active')) {
                    $(this).find('.selected-icon').removeClass('active');
                    var item = layer.find('#'+$(this).data('option'));
                    item.remove();
                    layer.batchDraw();
                } else {
                    $(this).find('.selected-icon').addClass('active');
                    selectedBuilderMethod = $(this).data('option');
                    enabled.push(selectedBuilderMethod);
                    var fnc = window[selectedBuilderMethod];
                    fnc(selectedColor);
                     // console.log(enabled);
                }
            });
            $('#customMenu2 a.step2').bind("click", function(){
                layer.clear();
                deliveryOptionLayer.clear();
                yourConnectionsLayer.clear();
                inventoryLayer.clear();
                routesLayer.clear();
                dscoLayer.clear();
                $('#customMenu2').fadeOut(function(){
                    $('#customMenu2').html('');
                    $('#menu2').fadeIn();
                });
            });
            $('#customMenu2 a.step4').bind("click", function(){
                builderMenu3();
            });
        });
    })
}
function builderMenu3() {
     // console.log('***********MENU 3***********');
    $('#customMenu2').fadeOut(function(){
        var menuHtml = '<h5>Where is the inventory located?</h5>'
        + '<p>Select all that apply:</p>'
        + '<ul>';
        var items = [];
        for (i=0; i < enabled.length; i++) {
            switch(enabled[i]) {
                case 'myStore1':
                    items.push({
                        "option":"myStore1",
                        "image":"images/1x/store_" + selectedColor + ".svg",
                        "title":"MY STORE",
                        "width":"102px",
                        "height":"91px;"
                    });
                    break;
                case 'myWarehouse':
                    items.push({
                        "option":"myWarehouse",
                        "image":"images/1x/warehouse_" + selectedColor + ".svg",
                        "title":"MY WAREHOUSE",
                        "width":"92px",
                        "height":"91px;"
                    });
                   
                    break;
                case 'my3pl':
                    items.push({
                        "option":"my3pl",
                        "image":"images/1x/3pl_" + selectedColor + ".svg",
                        "title":"MY 3PL",
                        "width":"104px",
                        "height":"89px;"
                    });
                   
                    break;
                case 'myFactory':
                    items.push({
                        "option":"myFactory",
                        "image":"images/1x/factory_" + selectedColor + ".svg",
                        "title":"MY FACTORY",
                        "width":"92px",
                        "height":"118px;"
                    });
                    break;
                case 'partnerStore':
                    items.push({
                        "option":"partnerStore",
                        "image":"images/1x/partner_store.svg",
                        "title":"PARTNER STORE",
                        "width":"103px",
                        "height":"91px;"
                    });
                    break;
                case 'partnerWarehouse':
                    items.push({
                        "option":"partnerWarehouse",
                        "image":"images/1x/partner_warehouse.svg",
                        "title":"PARTNER WAREHOUSE",
                        "width":"92px",
                        "height":"118px;"
                    });
                    break;
                case 'partnerFactory':
                    items.push({
                        "option":"partnerFactory",
                        "image":"images/1x/partner_factory.svg",
                        "title":"PARTNER FACTORY",
                        "width":"92px",
                        "height":"118px;"
                    });
                    break;
                
            }
        }

        for (i = 0; i < items.length; i++) {
            menuHtml += '<li>'
            + '<div class="img"><div class="img_wrapper"><img src="'+items[i].image+'" height="'+ items[i].height +'" width="'+ items[i].width +'"></div></div>'
            + '<div class="content"><h5>'+items[i].title+' INVENTORY IS:</h5>'
            + '<ul class="inventory-options">'
            + '<li class="inventory" data-option="'+ items[i].option+'Inventory"><img src="images/1x/inventory_' + selectedColor + '.svg"><i class="selected-icon"></i> <label>OWNED</label></li>'
            + '<li class="inventory" data-option="'+ items[i].option+'InventoryPartner"><img src="images/1x/partner_inventory.svg"><i class="selected-icon"></i> <label>PARTNER</label></li>'
            + '</ul>'
            + '</div></li>';
        }
        menuHtml += '</ul>'
        + '<div class="actions">'
        + '<a href="#" class="btn prev step2">« BACK</a>'
        + '<a href="#" class="btn next step4">NEXT »</a>'
        + '</div>';

        $('#customMenu3').append(menuHtml).fadeIn(function(){
            $('#customMenu3 li .inventory').bind("click", function(){
                if ($(this).find('.selected-icon').hasClass('active')) {
                    $(this).find('.selected-icon').removeClass('active');
                    var selectedOption = $(this).data('option');
                     // console.log(selectedOption);
                    var item = inventoryLayer.find('#'+selectedOption);
                    item.remove();
                    inventoryLayer.batchDraw();
                } else {
                    $(this).find('.selected-icon').addClass('active');
                    selectedBuilderMethod = $(this).data('option');
                    var fnc = window[selectedBuilderMethod];
                    fnc(selectedColor);
                }
            });
            $('#customMenu3 a.step2').bind("click", function(){
                inventoryLayer.clear();
                inventoryLayer.destroyChildren();
                $('#customMenu3').fadeOut(function(){
                    $('#customMenu3').html('');
                    $('#customMenu2').fadeIn();
                });
            });
            $('#customMenu3 a.step4').bind("click", function(){
                builderMenu4();
            });
        });
    });
}
function builderMenu4() {
     // console.log('****MENU 4****');
    $('#customMenu3').fadeOut(function(){
        var menuHtml = '<h5>What channels do you use to offer products to your consumer?</h5>'
        + '<p>Select all that apply:</p>'
        + '<ul>';
        var items = [];
        items.push({
            "option":"myStore1",
            "image":"images/1x/store_" + selectedColor + ".svg",
            "title":"MY STORE",
            "text":"Drop shipping enables a retailer to expose inventory to the end consumer that they have not yet purchased from their supplying partner.",
            "width":"102px",
            "height":"91px;"
        });
        items.push({
            "option":"myCallCenter",
            "image":"images/1x/callcenter_" + selectedColor + ".svg",
            "title":"MY CALL CENTER",
            "text":"Drop shipping enables a retailer to expose inventory to the end consumer that they have not yet purchased from their supplying partner.",
            "width":"68px",
            "height":"77px;"
        });
        items.push({
            "option":"myWebsite",
            "image":"images/1x/website_" + selectedColor + ".svg",
            "title":"MY eCOMMERCE WEBSITE",
            "text":"Drop shipping enables a retailer to expose inventory to the end consumer that they have not yet purchased from their supplying partner.",
            "width":"58px",
            "height":"88px;"
        });
        items.push({
            "option":"partnerStore",
            "image":"images/1x/partner_store.svg",
            "title":"PARTNER STORE",
            "text":"Drop shipping enables a retailer to expose inventory to the end consumer that they have not yet purchased from their supplying partner.",
            "width":"103px",
            "height":"91px;"
        });
        items.push({
            "option":"partnerWebsite",
            "image":"images/1x/partner_website.svg",
            "title":"PARTNER eCOMMERCE WEBSITE",
            "text":"Drop shipping enables a retailer to expose inventory to the end consumer that they have not yet purchased from their supplying partner.",
            "width":"58px",
            "height":"89px;"
        });

        for (i = 0; i < items.length; i++) {
            menuHtml += '<li data-option="'+ items[i].option+'">'
            + '<div class="img"><div class="img_wrapper"><img src="'+items[i].image+'" height="'+ items[i].height +'" width="'+ items[i].width +'"><i class="selected-icon"></i></div></div>'
            + '<div class="content"><h5>'+items[i].title+'</h5>'
            + items[i].text+'</div></li>';
        }
        menuHtml += '</ul>'
        + '<div class="actions">'
        + '<a href="#" class="btn prev step2">« BACK</a>'
        + '<a href="#" class="btn next step4">NEXT »</a>'
        + '</div>';

        $('#customMenu4').append(menuHtml).fadeIn(function(){
            $('#customMenu4 li').bind("click", function(){
                if ($(this).find('.selected-icon').hasClass('active')) {
                    $(this).find('.selected-icon').removeClass('active');
                    var item = layer.find('#'+$(this).data('option'));
                    item.remove();
                    layer.batchDraw();
                } else {
                    $(this).find('.selected-icon').addClass('active');
                    selectedBuilderMethod = $(this).data('option');
                    enabledInventory.push(selectedBuilderMethod);
                    if (selectedBuilderMethod!='myStore1'&&selectedBuilderMethod!='partnerStore') {
                        var fnc = window[selectedBuilderMethod];
                        fnc(selectedColor);
                    }
                }
            });
            $('#customMenu4 a.step2').bind("click", function(){
                layer.clear();
                deliveryOptionLayer.clear();
                yourConnectionsLayer.clear();
                inventoryLayer.clear();
                routesLayer.clear();
                dscoLayer.clear();
                $('#customMenu4').fadeOut(function(){
                    $('#customMenu4').html('');
                    $('#customMenu3').fadeIn();
                });
            });
            $('#customMenu4 a.step4').bind("click", function(){
                menu4('BUILD YOUR OWN','GREAT JOB!','<p>It’s beautiful! Click through the tabs to see how you can use Dsco’s solution to simplify all the connections in your ecosystem.</p><p>Let’s make your solution a reality! A concerted effort by your team can get many of your inventory locations up and running in a matter of days, and Dsco is ready to help you make that happen.</p>','#customMenu4',false);
                showForm('DROP SHIP with DSCO', 'Drop ship winners clear away barriers to partnership at scale, allowing them to remove bugs in the consumer experience and reinvent their financial models. Strong partnerships turn drop ship challenges into opportunities.','Download this cool thing about Drop Shipping with Dsco');
                // if (enabledInventory.includes("myCallCenter")) {
                //     leftRoute1();
                //     Konva.Image.fromURL('images/1x/smallparcel_right.svg', function (image) {
                //         image.setAttrs({
                //             x: 400,
                //             y: 435,
                //             width: 40,
                //             height: 36,
                //             opacity: 0,
                //         });
                //         deliveryOptionLayer.add(image);
                //         image.zIndex(8);
                //         image.to({opacity: 1});
                //         deliveryOptionLayer.batchDraw();
                //     });
                // }
                if (enabled.includes("myStore1")) {
                    leftRoute2();
                    Konva.Image.fromURL('images/1x/smallparcel_right.svg', function (image) {
                        image.setAttrs({
                            x: 480,
                            y: 480,
                            width: 40,
                            height: 36,
                            opacity: 0,
                        });
                        deliveryOptionLayer.add(image);
                        image.zIndex(8);
                        image.to({opacity: 1});
                        deliveryOptionLayer.batchDraw();
                    });
                }
                if (enabled.includes("my3pl")) {
                    leftRoute3();
                    Konva.Image.fromURL('images/1x/smallparcel_right.svg', function (image) {
                        image.setAttrs({
                            x: 317,
                            y: 388,
                            width: 40,
                            height: 36,
                            opacity: 0,
                        });
                        deliveryOptionLayer.add(image);
                        image.zIndex(8);
                        image.to({opacity: 1});
                        deliveryOptionLayer.batchDraw();
                    });
                }
                if (enabled.includes("myWarehouse")) {
                    leftRoute4();
                    Konva.Image.fromURL('images/1x/smallparcel_right.svg', function (image) {
                        image.setAttrs({
                            x: 240,
                            y: 340,
                            width: 40,
                            height: 36,
                            opacity: 0,
                        });
                        deliveryOptionLayer.add(image);
                        image.zIndex(8);
                        image.to({opacity: 1});
                        deliveryOptionLayer.batchDraw();
                    });
                }
                if (enabled.includes("myFactory")) {
                    leftRoute5();
                    Konva.Image.fromURL('images/1x/smallparcel_right.svg', function (image) {
                        image.setAttrs({
                            x: 160,
                            y: 295,
                            width: 40,
                            height: 36,
                            opacity: 0,
                        });
                        deliveryOptionLayer.add(image);
                        image.zIndex(8);
                        image.to({opacity: 1});
                        deliveryOptionLayer.batchDraw();
                    });
                }
                if (enabled.includes("partnerWarehouse")) {
                    rightRoute1();
                    Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
                        image.setAttrs({
                            x: 505,
                            y: 185,
                            width: 40,
                            height: 36,
                            opacity: 0,
                        });
                        deliveryOptionLayer.add(image);
                        image.zIndex(8);
                        image.to({opacity: 1});
                        deliveryOptionLayer.batchDraw();
                    });
                }
                if (enabled.includes("partnerFactory")) {
                    rightRoute2();
                    Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
                        image.setAttrs({
                            x: 425,
                            y: 137,
                            width: 40,
                            height: 36,
                            opacity: 0,
                        });
                        deliveryOptionLayer.add(image);
                        image.zIndex(8);
                        image.to({opacity: 1});
                        deliveryOptionLayer.batchDraw();
                    });
                }
                // if (enabledInventory.includes("partnerWebsite")) {
                //     rightRoute4();
                //     Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
                //         image.setAttrs({
                //             x: 665,
                //             y: 278,
                //             width: 40,
                //             height: 36,
                //             opacity: 0,
                //         });
                //         deliveryOptionLayer.add(image);
                //         image.zIndex(8);
                //         image.to({opacity: 1});
                //         deliveryOptionLayer.batchDraw();
                //     });
                // }
                if (enabled.includes("partnerStore")) {
                    rightRoute5();
                    Konva.Image.fromURL('images/1x/smallparcel_left.svg', function (image) {
                        image.setAttrs({
                            x: 745,
                            y: 325,
                            width: 40,
                            height: 36,
                            opacity: 0,
                        });
                        deliveryOptionLayer.add(image);
                        image.zIndex(8);
                        image.to({opacity: 1});
                        deliveryOptionLayer.batchDraw();
                    });
                }
            });
        });
    });
}