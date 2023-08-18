"use strict";
//layer png files at : https://drive.google.com/file/d/1ORDgn4R8_KkAm2qleh9fLhuF9fDyhJVP/view?usp=sharing

const exportDirfixname = '_export';

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
console.log('basePath: ' + basePath);
const fs = require("fs");

const {
  layerConfigurations,
  layersDir
} = require(path.join(basePath, "/src/config.js"));


const toCamelCase = (str) => {
  return str.split('_').map(function (word, index) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
};

const getLayerDirs = () => {
  return fs.readdirSync(layersDir + exportDirfixname);
}


const copyFolderSync = (source, target) => {
  // 如果目标文件夹不存在，则创建它
  checkDirExists(target);

  // 读取源文件夹中的所有文件/子文件夹，并逐个复制到目标文件夹中
  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      // 如果源路径是文件夹，则递归调用copyFolderSync函数
      copyFolderSync(sourcePath, targetPath);
    } else {
      // 如果源路径是文件，则直接复制到目标路径中
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

const checkDirExists = (dirname) => {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
}

const buildSetup = () => {
  if (fs.existsSync(layersDir)) {
    fs.rmSync(layersDir, { recursive: true });
  }
  fs.mkdirSync(layersDir);
};

buildSetup();



//仅仅是复制
const moveBackground = (dirname) => {
  let from = path.join(layersDir + exportDirfixname, dirname);
  let to = path.join(layersDir, dirname);
  copyFolderSync(from, to);
};

//身体
const moveBody = (dirname) => {
  let from = path.join(layersDir + exportDirfixname, dirname);
  let to = path.join(layersDir, dirname);
  checkDirExists(to);
  fs.readdirSync(from).forEach((file) => {
    const sourcePath = path.join(from, file);
    const filename = path.basename(file);
    const fileNameWithoutExt = path.parse(filename).name;
    const targetPath = path.join(to, fileNameWithoutExt);

    checkDirExists(targetPath);
    fs.copyFileSync(sourcePath, path.join(targetPath, filename));
  });
};

//衣服
const moveCloth = (dirname, zIdx) => {
  let from = path.join(layersDir + exportDirfixname, dirname);
  let to = path.join(layersDir, 'Body', zIdx + "," + dirname);
  copyFolderSync(from, to);
};


//大耳朵
const moveBigear = (dirname) => {
  let bodypath = path.join(layersDir + exportDirfixname, 'Body');
  fs.readdirSync(bodypath).forEach((file) => {
    const sourcePath = path.join(bodypath, file);
    const filename = path.basename(file);
    const fileNameWithoutExt = path.parse(filename).name;
    let to1 = path.join(layersDir, "Body", fileNameWithoutExt, 'Ear');
    checkDirExists(to1);
    let to = path.join(layersDir, "Body", fileNameWithoutExt, 'Ear', 'z16,Up ear');
    checkDirExists(to);
    let from = path.join(layersDir + exportDirfixname, dirname);//Up ear 复制到body/Ear/Up ear/
    fs.readdirSync(from).forEach((file) => {
      const sourcePath = path.join(from, file);
      const filename = path.basename(file);
      fs.copyFileSync(sourcePath, path.join(to, filename));
    });
  });
};

//小耳朵
const moveSmallear = (dirname) => {
  let bodypath = path.join(layersDir + exportDirfixname, 'Body');
  fs.readdirSync(bodypath).forEach((file) => {
    const sourcePath = path.join(bodypath, file);
    const filename = path.basename(file);
    const fileNameWithoutExt = path.parse(filename).name;
    let to1 = path.join(layersDir, "Body", fileNameWithoutExt, 'Ear');
    checkDirExists(to1);
    let to = path.join(layersDir, "Body", fileNameWithoutExt, 'Ear', 'z15,Elf ear');
    checkDirExists(to);
    let from = path.join(layersDir + exportDirfixname, dirname);//Elf ear 复制到body/Ear/Elf ear/
    fs.readdirSync(from).forEach((file) => {
      const sourcePath = path.join(from, file);
      const filename = path.basename(file);
      fs.copyFileSync(sourcePath, path.join(to, filename));
    });
  });
};


//手
const moveHand = (dirname) => {
  let bodypath = path.join(layersDir + exportDirfixname, 'Body');
  fs.readdirSync(bodypath).forEach((file) => {
    const sourcePath = path.join(bodypath, file);
    const filename = path.basename(file);
    const fileNameWithoutExt = path.parse(filename).name;
    let to = path.join(layersDir, "Body", fileNameWithoutExt, 'Hand');
    checkDirExists(to);
    let from = path.join(layersDir + exportDirfixname, dirname);//hand 复制到body/hand
    fs.readdirSync(from).forEach((file) => {
      const sourcePath = path.join(from, file);
      const filename = path.basename(file);
      fs.copyFileSync(sourcePath, path.join(to, filename));
    });
  });
};


//特殊皮肤
const moveSpecialBody = (dirname) => {
  let bodypath = path.join(layersDir + exportDirfixname, 'Body');
  fs.readdirSync(bodypath).forEach((file) => {
    const sourcePath = path.join(bodypath, file);
    const filename = path.basename(file);
    const fileNameWithoutExt = path.parse(filename).name;
    let to = path.join(layersDir, "Body", fileNameWithoutExt, 'Special Body');
    checkDirExists(to);
    let from = path.join(layersDir + exportDirfixname, dirname);//Special Body 复制到body/Special Body
    fs.readdirSync(from).forEach((file) => {
      const sourcePath = path.join(from, file);
      const filename = path.basename(file);
      fs.copyFileSync(sourcePath, path.join(to, "z1,"+filename));
    });
  });
};

//角
const moveHorn = (dirname) => {
  let bodypath = path.join(layersDir + exportDirfixname, 'Body');
  fs.readdirSync(bodypath).forEach((file) => {
    const sourcePath = path.join(bodypath, file);
    const filename = path.basename(file);
    const fileNameWithoutExt = path.parse(filename).name;
    let to1 = path.join(layersDir, "Body", fileNameWithoutExt, 'Ear');
    checkDirExists(to1);
    let to2 = path.join(layersDir, "Body", fileNameWithoutExt, 'Ear', 'z15,Elf ear');
    checkDirExists(to2);
    let to = path.join(layersDir, "Body", fileNameWithoutExt, 'Ear', 'z15,Elf ear', 'z14,Horn');
    checkDirExists(to);
    let from = path.join(layersDir + exportDirfixname, dirname);//horn 复制到body/Ear/Elf ear/
    fs.readdirSync(from).forEach((file) => {
      const sourcePath = path.join(from, file);
      const filename = path.basename(file);
      fs.copyFileSync(sourcePath, path.join(to, filename));
    });
  });
};


// const layerDirs = getLayerDirs();
// layerDirs.sort((a, b) => {
//   if (a === "body" && b !== "body") {
//     return -1; // 将a排在b之前
//   } else if (a !== "body" && b.name === "body") {
//     return 1; // 将b排在a之前
//   } else {
//     return 0; // 保持原有的顺序
//   }
// });

// layerDirs.map((dirname) => {
//   console.log(toCamelCase(dirname));
//   moveDir(toCamelCase(dirname))
// });

moveBackground('Background');
moveBackground('tail');
moveBody('Body');
moveCloth('Cloth', "z2");
moveCloth('Eyebrow', "z10");
moveCloth('Hair', "z11");
moveHand('Hand');
moveSpecialBody('Special Body')
moveCloth('Mouth', "z13");
moveBigear('Up ear');
moveSmallear('Elf ear');
moveCloth('Eye', "z17");
moveHorn('Horn');