(function () {

    var config = {
        userBaseUrl: 'https://jsonplaceholder.typicode.com/users',
        userDetailTemplate: $.get('../Templates/UserDetail.html'),
        userEditionTemplate: $.get('../Templates/UserEdition.html')
    };

    var userInfo = {};

    var methods = {

        getUserId: function () {
            var userId = location.href.split('userId=')[1];
            if (isNaN(userId)) {
                methods.redirectToList();
            } else {
                return userId;
            }
        },

        getUserInfo: function () {
            $.get(config.userBaseUrl + '/' + methods.getUserId())
                .done(function (response) {
                    userInfo.resourseData = response;
                    methods.renderTemplate(config.userDetailTemplate, true);
                    methods.setUserDetailEvents();
                })
                .fail(function () {
                    methods.redirectToList();
                });
        },

        renderTemplate: function (template, insertData) {
            var template = Handlebars.compile(template.responseText);
            $('#userContainer').html(template(insertData ? userInfo.resourseData : {}));
        },

        validateSessionStorage: function () {
            return !isNaN(methods.getUserId());
        },

        setUserDetailEvents: function () {
            $('[data-action]').click(function (event) {
                methods['userDetail' + $(event.currentTarget).data('action')]();
            });
        },

        userDetailDelete: function () {
            $('[data-action]').off();
            $.ajax({
                url: config.userBaseUrl + '/' + methods.getUserId(),
                type: 'DELETE',
                success: function () {
                    methods.redirectToList();
                },
                error: function () {
                    methods.redirectToList();
                }
            });
        },

        userDetailEdit: function () {
            $('[data-action]').off();
            methods.renderTemplate(config.userEditionTemplate, true);
            $('#userInfoForm').on('submit', function (event) {
                event.preventDefault();
                methods.putUser();
                $('#userInfoForm, #cancelUserForm').off();
            });
            $('#cancelUserForm').on('click', function () {
                methods.getUserInfo();
                $('#cancelUserForm').off();
            });
        },

        userDetailReturn: function () {
            $('[data-action]').off();
            methods.redirectToList();
        },

        userDetailCreate: function () {
            $('[data-action]').off();
            methods.renderTemplate(config.userEditionTemplate, false);
            $('#userInfoForm').on('submit', function (event) {
                event.preventDefault();
                methods.createUser();
                $('#userInfoForm, #cancelUserForm').off();
            });
            $('#cancelUserForm').on('click', function () {
                methods.getUserInfo();
                $('#cancelUserForm').off();
            });
        },

        getFormData: function () {
            return {
                name: $('#editUserName').val(),
                username: $('#editUserUserName').val(),
                email: $('#editUserEmail').val(),
                address: {
                    street: $('#editUserStreet').val(),
                    suite: $('#editUserSuite').val(),
                    city: $('#editUserCity').val(),
                    zipcode: $('#editUserZipCode').val(),
                    geo: {
                        lat: $('#editUserLatitude').val(),
                        lng: $('#editUserLongitude').val()
                    }
                },
                phone: $('#editUserPhone').val(),
                website: $('#editUserWeb').val(),
                company: {
                    name: $('#editUserCompanyName').val(),
                    catchPhrase: $('#editUserCatchPhrase').val(),
                    bs: $('#editUserBs').val()
                }
            };
        },

        putUser: function () {
            var userData = methods.getFormData();

            $.ajax({
                url: config.userBaseUrl + '/' + methods.getUserId(),
                type: 'PUT',
                dataType: 'json',
                data: userData,
                success: function () {
                    methods.getUserInfo();
                },
                error: function () {
                    methods.getUserInfo();
                }
            });
        },

        createUser: function () {
            var userData = methods.getFormData();

            $.ajax({
                url: config.userBaseUrl,
                type: 'POST',
                dataType: 'json',
                data: userData,
                success: function () {
                    methods.getUserInfo();
                },
                error: function () {
                    methods.getUserInfo();
                }
            });
        },

        redirectToList: function () {
            window.location.href = 'http://localhost:8080';
        }

    };

    if (methods.validateSessionStorage()) {
        methods.getUserInfo();
    } else {
        methods.redirectToList();
    }

})();