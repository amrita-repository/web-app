$(document).ready(function () {
    let token = localStorage.getItem("token");
    if (token == null) {
        window.location.href = 'index.html';
    }
    let loading = new Loading({
        title: 'Please wait',
        titleColor: 'rgb(217, 83, 79)',
        discription: 'Loading...',
        discriptionColor: 'rgb(77, 150, 223)',
        animationOriginColor: 'rgb(179,139,44)',
        mask: true,
        loadingPadding: '20px 50px',
        defaultApply: true,
    });

    let url = "https://amritavidya.amrita.edu:8444/DataServices/rest/semRes?rollno=" + localStorage.getItem("username");
    let container = $('#semesters');

    if (localStorage.getItem("sem-for-grades") == null) {
        $.ajax({
            method: 'GET',
            url: url,
            headers: {
                "Authorization": "Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token": localStorage.getItem("token")
            },
            dataType: 'json',
            success: (res) => {
                try {
                    localStorage.setItem("sem-for-grades", JSON.stringify(res));
                    for (let i = 0; i < res.Semester.length; ++i) {
                        let current = res.Semester[i];
                        container.append('<li class="list-group-item list-group-item-action" onclick="showGrades(this.value)" value=' + current.Id + '>' + "Semester " + current.Semester + '</li>');
                    }
                    localStorage.setItem("token", res.Token);
                    loading.out();
                } catch (e) {
                    alert(e.message);
                }
            },
            error: (err) => {
                alert(err.message);
                loading.out();
            }
        });
    } else {
        try {
            res = JSON.parse(localStorage.getItem("sem-for-grades"));
            for (let i = 0; i < res.Semester.length; ++i) {
                let current = res.Semester[i];
                container.append('<li class="list-group-item list-group-item-action" onclick="showGrades(this.value)" value=' + current.Id + '>' + "Semester " + current.Semester + '</li>');
            }
            loading.out();
        } catch (e) {
            alert(e.message);
        }
    }

    if(localStorage.getItem("sem-for-grades"))
    {
        const node = document.getElementById('clear');
        node.style.visibility = 'visible';
    }

});

function showGrades(sem) {
    let loading = new Loading({
        title: 'Please wait',
        titleColor: 'rgb(217, 83, 79)',
        discription: 'Loading...',
        discriptionColor: 'rgb(77, 150, 223)',
        animationOriginColor: 'rgb(179,139,44)',
        mask: true,
        loadingPadding: '20px 50px',
        defaultApply: true,
    });
    let url = "https://amritavidya.amrita.edu:8444/DataServices/rest/andRes?rollno=" + localStorage.getItem("username") + "&sem=" + sem;
    let container = $('#semesters');
    const node = document.getElementById('clear');
    $.ajax({
        method: 'GET',
        url: url,
        headers: {
            "Authorization": "Basic YWRtaW46YWRtaW5AQW5kQVBQ", "token": localStorage.getItem("token")
        },
        dataType: 'json',
        success: (res) => {
            try {
                container.empty();
                for (let i = 0; i < res.Subject.length; ++i) {
                    let current = res.Subject[i];
                    container.append('<li class="list-group-item list-group-item-action">'
                        + current.CourseName + ' - <span style="color: #ff0000;"> ' + current.Grade + ' Grade</span></li>');
                }
                $("#title").html("Your Grades");
                localStorage.setItem("token", res.Token);
                loading.out();
            } catch (e) {
                alert(e.message);
            } finally {
                node.style.visibility = 'hidden';
            }
        },
        error: (err) => {
            alert(err.message);
            loading.out();
        }
    });
}
