#!bin/bash

#路径与安装Qt的位置以及版本有关

#覆盖fcitx-frontend-qt5的安装目录
cp -vf libfcitxplatforminputcontextplugin.so /usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/

#以下的命令与Qt安装目录相关请对应的替换
#复制文件到QtCreator的对应目录
cp -vf libfcitxplatforminputcontextplugin.so /opt/Qt/Tools/QtCreator/lib/Qt/plugins/platforminputcontexts/
#复制到库目录
cp -vf libfcitxplatforminputcontextplugin.so /opt/Qt/5.12.2/gcc_64/plugins/platforminputcontexts/
#复制到库目录 本人安装了两个版本根据自己实际情况添加
#cp -vf libfcitxplatforminputcontextplugin.so /opt/Qt/5.12.0/gcc_64/plugins/platforminputcontexts/