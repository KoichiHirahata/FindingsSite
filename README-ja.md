#Findings Site�i�������E�����g���������{���V�X�e���j Ver.0.13.2
 �y������zWindows XP/7/8/8.1/10/Linux  
 �y��舵����ʁz�t���[�\�t�g  
 �y�J���z�i���j���C�h�C���N���j�b�N�i<http://www.madeinclinic.jp>�j  
 �y�J�����zMicrosoft Visual Studio 2015 (Visual C# 2015)


##�T�v  
���ЂŊJ�����Ă���������E�����g�������̓V�X�e���iFindings Editor�j��
�L�^����������WEB�u���E�U�Ō��邽�߂̃V�X�e���ł��B
Web�u���E�U�𗘗p����̂ŁA__iPad�AAndroid__�ł��������{�����邱�Ƃ��ł��܂��B
�ʐM��SSL�ňÍ������Ă���AID�A�p�X���[�h�Ń��O�C���Ǘ������Ă���̂ŁA
���S�ɉ^�p�ł��܂��B

##�����
Windows XP�A7�A8�A8.1�A10�ł̓�����m�F���Ă��܂��B
�������AWindows XP�̓T�|�[�g�������I�����Ă��邽�߁A�������܂���B
��ʓI��Linux�ł����삷��͂��ł����A���؂͂��Ă��܂���B

##����ɕK�v�ȃ\�t�g�E�F�A
Node.js

##�C���X�g�[��
###�C���X�g�[�����@�i�T�[�o�[�j
<https://nodejs.org/en/>�@�ɃA�N�Z�X���āANode.js���C���X�g�[�����Ă��������B  
PostgreSQL�ƒʐM�ł���}�V���A�܂���PostgreSQL���C���X�g�[������Ă���
�}�V���̓K���ȃt�H���_�ɉ𓀂��Ă��������B  
���W�X�g���͈�ؕύX���܂���B  
routes�t�H���_����conf.js���������Ȃǂ̃G�f�B�^�ŊJ���Ă��������B  

    exports.conf = "tcp://db_user:db_user�̃p�X���[�h@�T�[�o�[IP:�|�[�g/endoDB?ssl=true"; 
    exports.hp = "��Ë@�֖�";    

��K�؂ȓ��e�ɏ��������Ă��������B 
 
��1�F  
    exports.conf = "tcp://db_user:testpassword@localhost:5432/endoDB?ssl=true";    
    exports.hp = "�����N���j�b�N"; `  

��2�F    
exports.conf = "tcp://db_user:testpassword@192.168.1.1:5432/endoDB?ssl=true";  
exports.hp = "�����N���j�b�N";  

[FindingsEditor postgres�̃C���X�g�[��](http://www.madeinclinic.jp/%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2/findings/fe_postgres/)
���Q�l��server.key��server.crt���쐬���Aserver.js�Ɠ����t�H���_�ɃR�s�[���Ă�������  
�R�}���h���C���ł��̃t�H���_�Ɉړ����A
node server.js
�����s����΋N�����܂��B

###�C���X�g�[�����@�i�N���C�A���g�j
WEB�u���E�U������Γ��ɉ����C���X�g�[������K�v�͂���܂���B
�i�C���^�[�l�b�g�G�N�X�v���[����6�ȏ�œ����͂��ł����A�ł��邾��
�V�������̂𗘗p���Ă��������B
�\�ł���΁AChrome��FireFox�Ȃǂ̃u���E�U�̗��p�������߂������܂��B�j

##�g�p���@
Web�u���E�U��
https://192.168.1.1:1337/
�iIP�͊��ɍ��킹�ēK�X�ύX���Ă��������j�ɃA�N�Z�X����Η��p�ł���͂��ł��B  
�Ȃ��A���O�C�����
https://192.168.1.1:1337/?pt_id=1000
�ɃA�N�Z�X����΁A���Ҕԍ�1000�̊��҂���̏����ꗗ���\������܂��B
�i���Ҕԍ��͔C�ӂ̔ԍ����w�肵�Ă��������B�j

***
�A����  
���s���ȓ_�A���v�]���������܂�����A������܂ł��A���������B  
URL: <http://www.madeinclinic.jp>  
E-mail:<info@madeinclinic.jp> 
   
����  
2016/03/02 Ver. 0.13.2�@�摜�̕\���i�t���b�N�\�j�ɑΉ��B  

�ᒘ�쌠����іƐӎ�����  
�@�{�\�t�g�E�F�A�̓t���[�\�t�g�ł��B�iGPL v3 ���C�Z���X�j
���R�Ɏg�p���Ă��������č\���܂��񂪁A  
���쌠�͊�����Ѓ��C�h�C���N���j�b�N���ۗL���Ă��܂��B  
�Ȃ��A���̃\�t�g�E�F�A���g�p�������Ƃɂ���Đ��������ׂĂ�
��Q�E���Q�E�s����Ɋւ��A���Ђ͈�؂̐ӔC�𕉂��܂���B  
�\�[�X�R�[�h��GitHub��Ō��J���Ă��܂��B  
<https://github.com/KoichiHirahata>

