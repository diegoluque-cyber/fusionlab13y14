import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='descuento',
            field=models.PositiveSmallIntegerField(
                default=0,
                help_text='Porcentaje de descuento (0 = sin oferta)',
                validators=[django.core.validators.MaxValueValidator(90)],
            ),
        ),
        migrations.CreateModel(
            name='Promocion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=120)),
                ('descripcion', models.CharField(blank=True, max_length=255)),
                ('codigo', models.CharField(blank=True, max_length=30)),
                ('activa', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'promociones',
            },
        ),
    ]
